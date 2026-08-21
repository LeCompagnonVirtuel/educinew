import type { SupabaseMessageRepository } from '../repositories';
import { attachmentUploadSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface AttachmentServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string[]> = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  ARCHIVE: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'],
};

export class AttachmentService {
  constructor(private readonly deps: AttachmentServiceDeps) {}

  async findAttachment(id: string) {
    const attachment = await this.deps.repository.findAttachment(id);
    if (!attachment) throw new Error('Attachment not found');
    return attachment;
  }

  async createAttachment(data: Record<string, unknown>) {
    const parsed = attachmentUploadSchema.parse(data);
    const file = parsed.file as File;
    this.validateFile(file);

    const attachment = await this.deps.repository.createAttachment({
      messageId: parsed.messageId,
      fileName: file.name,
      fileType: file.type.split('/')[1] || 'unknown',
      fileSize: file.size,
      fileUrl: '',
      mimeType: file.type,
      type: this.getAttachmentType(file.type),
      uploadedBy: data.uploadedBy as string,
    });

    logger.info('Attachment created', { attachmentId: attachment.id }, 'messages');
    return attachment;
  }

  async deleteAttachment(id: string) {
    const existing = await this.deps.repository.findAttachment(id);
    if (!existing) throw new Error('Attachment not found');
    await this.deps.repository.deleteAttachment(id);
    logger.info('Attachment deleted', { attachmentId: id }, 'messages');
  }

  async getAttachments(messageId: string) {
    return this.deps.repository.getAttachments(messageId);
  }

  validateFile(file: File): void {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
    }

    const type = this.getAttachmentType(file.type);
    if (type === 'OTHER') {
      throw new Error('File type not allowed');
    }
  }

  async generateThumbnail(fileUrl: string, mimeType: string): Promise<string | null> {
    if (!mimeType.startsWith('image/')) return null;
    return `${fileUrl}?thumb=200x200`;
  }

  async getDownloadUrl(attachmentId: string): Promise<string> {
    const attachment = await this.deps.repository.findAttachment(attachmentId);
    if (!attachment) throw new Error('Attachment not found');
    return attachment.fileUrl;
  }

  private getAttachmentType(mimeType: string): string {
    for (const [type, mimeTypes] of Object.entries(ALLOWED_TYPES)) {
      if (mimeTypes.includes(mimeType)) return type;
    }
    return 'OTHER';
  }
}
