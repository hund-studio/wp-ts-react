interface WPRModeConfig {
  current: "local" | "staging" | "production";
  local: string;
  staging: string;
  production: string;
}
