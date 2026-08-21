import { describe, it, expect } from 'vitest';
import * as hooks from '../../src/features/communication/hooks';

describe('Communication Hooks - Export Verification', () => {
  const expectedHooks = [
    'useConversations', 'useConversation', 'useCreateConversation', 'useUpdateConversation',
    'useDeleteConversation', 'useArchiveConversation', 'useMuteConversation', 'usePinConversation',
    'useAddParticipant', 'useRemoveParticipant', 'useSearchConversations', 'useConversationStats',
    'useMessages', 'useMessage', 'useSendMessage', 'useEditMessage',
    'useDeleteMessage', 'usePinMessage', 'useReactToMessage', 'useRemoveReaction',
    'useReplyToMessage', 'useForwardMessage', 'useSearchMessages', 'useMarkAsRead',
    'useMarkAsDelivered', 'useUnreadCount', 'useBulkMarkAsRead', 'useBulkDeleteMessages',
    'useRecentConversations', 'useMessageStats',
    'useThread', 'useThreadMessages', 'useLockThread', 'useThreadStats',
    'useGroups', 'useGroup', 'useCreateGroup', 'useUpdateGroup',
    'useDeleteGroup', 'useAddGroupMember', 'useRemoveGroupMember', 'useUpdateGroupMemberRole',
    'useInviteToGroup', 'useGroupInvites',
    'useCalls', 'useCall', 'useInitiateCall', 'useJoinCall',
    'useLeaveCall', 'useEndCall', 'useMuteCallParticipant', 'useToggleVideo',
    'useToggleScreenShare', 'useCallStats',
    'useEmails', 'useEmail', 'useSendEmail', 'useSaveDraft',
    'useDeleteEmail', 'useEmailTemplates', 'useCreateEmailTemplate',
    'useSendCampaign', 'useEmailCampaigns', 'useEmailStats',
    'useSmsMessages', 'useSendSms', 'useSendBulkSms', 'useSmsTemplates',
    'useCreateSmsTemplate', 'useSmsStats',
    'usePushNotifications', 'useSendPushNotification', 'useSubscribeToPush', 'useUnsubscribeFromPush',
    'usePushTemplates', 'usePushStats',
    'useAnnouncements', 'useAnnouncement', 'useCreateAnnouncement', 'useUpdateAnnouncement',
    'useDeleteAnnouncement', 'usePublishAnnouncement', 'useAcknowledgeAnnouncement', 'useAnnouncementStats',
    'useCalendarEvents', 'useCalendarEvent', 'useCreateCalendarEvent', 'useUpdateCalendarEvent',
    'useDeleteCalendarEvent', 'useRespondToEvent', 'useCalendarSubscriptions', 'useCalendarStats',
    'useTasks', 'useTask', 'useCreateTask', 'useUpdateTask',
    'useDeleteTask', 'useAssignTask', 'useAddTaskComment', 'useTaskStats',
    'useDocuments', 'useDocument', 'useCreateDocument', 'useUpdateDocument',
    'useDeleteDocument', 'useShareDocument', 'useDocumentVersions',
    'useDocumentStats',
    'useStartCollaboration', 'useCollaborationSessions', 'useCollaborationPresence', 'useEndCollaboration',
    'useGenerateSummary', 'useTranslateText', 'useCorrectText', 'useSuggestResponse',
    'useGenerateMeetingSummary', 'useDetectSpam',
    'useNotifications', 'useMarkNotificationRead', 'useNotificationPreferences',
    'useUpdateNotificationPreference', 'useSendNotificationBatch',
    'useContacts', 'useContact', 'useCreateContact', 'useUpdateContact',
    'useContactStats',
    'usePolls', 'usePoll', 'useCreatePoll', 'useVotePoll', 'useClosePoll',
    'useWebhooks', 'useCreateWebhook', 'useUpdateWebhook', 'useDeleteWebhook',
    'useChannels', 'useChannel', 'useCreateChannel', 'useUpdateChannel', 'useDeleteChannel',
    'useUpdatePresence', 'usePresence', 'usePresenceStats',
    'useAutoResponses', 'useCreateAutoResponse', 'useUpdateAutoResponse', 'useDeleteAutoResponse',
    'useSearch', 'useSearchStats',
    'useExportConversation', 'useExportDocuments',
    'useScheduleMessage', 'useCancelScheduledMessage', 'useScheduledMessages',
  ];

  for (const hookName of expectedHooks) {
    it(`should export ${hookName}`, () => {
      expect(typeof (hooks as Record<string, unknown>)[hookName]).toBe('function');
    });
  }

  it('should export all hooks from barrel index', () => {
    const hookModule = hooks as Record<string, unknown>;
    const exportedKeys = Object.keys(hookModule).filter(k => k.startsWith('use'));
    expect(exportedKeys.length).toBeGreaterThanOrEqual(150);
  });

  it('should have consistent hook naming convention', () => {
    const hookModule = hooks as Record<string, unknown>;
    const hookNames = Object.keys(hookModule).filter(k => k.startsWith('use'));
    for (const name of hookNames) {
      expect(name).toMatch(/^use[A-Z]/);
    }
  });
});
