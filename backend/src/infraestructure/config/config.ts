const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  sr_user: process.env.SR_USER || "",
  SALT: process.env.SALT || "5",
  token_access: process.env.KEY_ACCESS_TOKEN || "",
  token_refresh: process.env.KEY_REFRESH_TOKEN || "",
  token_secret_key: process.env.TOKEN_SECRET_KEY!,
  token_Me: process.env.TOKEN_ME!,
};

export default config;
