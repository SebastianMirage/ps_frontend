import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  route("installHook.js.map", "routes/installHookMap.ts"),
  index("routes/home.tsx"),
] satisfies RouteConfig
