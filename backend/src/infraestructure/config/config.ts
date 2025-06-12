const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  sr_user: process.env.SR_USER || "",
};

export default config;
