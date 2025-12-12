enum FieldMessagesEnum {
  NAME_TOO_SHORT = "O nome deve ter pelo menos 3 caracteres",
  NAME_TOO_LONG = "O nome deve ter no máximo 50 caracteres",
  EMAIL_TOO_LONG = "O e-mail deve ter no máximo 255 caracteres",
  INVALID_EMAIL = "Este e-mail não é válido",
  PASSWORD_TOO_SHORT = "A senha deve ter pelo menos 8 caracteres",
  PASSWORD_TOO_LONG = "A senha deve ter no máximo 20 caracteres",
  PASSWORD_MUST_CONTAIN_ALPHANUMERIC = "A senha deve conter apenas caracteres alfanuméricos",
  USERNAME_INVALID = "Nome de usuário inválido",
  PASSWORD_DONT_MATCH = "As senhas não coincidem",
  PASSWORD_WRONG = "Senha incorreta",
}

export { FieldMessagesEnum };
