enum FieldMessagesEnum {
  NAME_TOO_SHORT = "The name must have at least 3 characters",
  NAME_TOO_LONG = "The name must have at most 50 characters",
  EMAIL_TOO_LONG = "The email must have at most 255 characters",
  INVALID_EMAIL = "This email is not valid",
  PASSWORD_TOO_SHORT = "The password must have at least 8 characters",
  PASSWORD_TOO_LONG = "The password must have at most 20 characters",
  PASSWORD_MUST_CONTAIN_ALPHANUMERIC = "Password must only contain alphanumeric characters",
  USERNAME_INVALID = "invalid username",
  PASSWORD_DONT_MATCH = "Password does not match",
}

export { FieldMessagesEnum };
