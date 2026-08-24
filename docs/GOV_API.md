# GOV_API.md — Government API Documentation

**Phase 4.1 — Government Integration**
**Version**: 1.0
**Status**: Production

---

## 1. Overview

Comprehensive API documentation for all government integration services. RESTful APIs with JSON payloads and standard HTTP methods.

## 2. Authentication

```http
Authorization: Bearer <api_key>
X-Government-Client: <client_id>
```

## 3. Base URLs

| Environment | Base URL |
|-------------|----------|
| Production | `https://api.educi.gov/v1` |
| Staging | `https://staging-api.educi.gov/v1` |
| Development | `https://dev-api.educi.gov/v1` |

## 4. Response Format

### Success
```json
{
  "status": "success",
  "data": {},
  "meta": { "page": 1, "per_page": 20, "total": 100 }
}
```

### Error
```json
{
  "status": "error",
  "error": { "code": "VALIDATION_ERROR", "message": "Invalid input" }
}
```

## 5. Ministry API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ministry/schools` | List schools |
| POST | `/ministry/schools` | Register school |
| GET | `/ministry/schools/:id` | Get school details |
| PUT | `/ministry/schools/:id` | Update school |

## 6. Registry API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/registry/institutions` | List institutions |
| POST | `/registry/institutions` | Register institution |
| GET | `/registry/staff` | List staff |
| GET | `/registry/students` | List students |

## 7. Examination API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/exams` | List examinations |
| POST | `/exams` | Create examination |
| GET | `/exams/:id/results` | Get results |

## 8. Finance API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/finance/budgets` | List budgets |
| POST | `/finance/budgets` | Create budget |
| GET | `/finance/transactions` | List transactions |

## 9. Rate Limiting

| Tier | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| Basic | 100 | 10,000 |
| Standard | 1,000 | 100,000 |
| Premium | 10,000 | 1,000,000 |

## 10. Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## 11. SDKs

```bash
npm install @educi/gov-sdk
pip install educi-gov-sdk
```

## 12. Testing

- **Sandbox URL**: `https://sandbox-api.educi.gov/v1`
- **Postman Collection**: `https://api.educi.gov/postman/collection.json`

## 13. Support

- **Documentation**: https://docs.educi.gov
- **Developer Portal**: https://developers.educi.gov
- **Status Page**: https://status.educi.gov

---

**Last Updated**: August 2026
**Owner**: API Documentation Team