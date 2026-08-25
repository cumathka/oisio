/**
 * Role-Based Access Control (RBAC) Architecture
 */

export type UserRole = "OWNER" | "ADMIN" | "MANAGER" | "EDITOR" | "VIEWER";

export type Permission =
  | "org:delete"
  | "org:update"
  | "billing:manage"
  | "team:invite"
  | "team:manage"
  | "project:create"
  | "project:edit"
  | "project:delete"
  | "crawl:execute"
  | "ai:generate"
  | "ads:edit"
  | "ads:export"
  | "report:export"
  | "dashboard:view"
  | "audit_log:view";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  OWNER: [
    "org:delete",
    "org:update",
    "billing:manage",
    "team:invite",
    "team:manage",
    "project:create",
    "project:edit",
    "project:delete",
    "crawl:execute",
    "ai:generate",
    "ads:edit",
    "ads:export",
    "report:export",
    "dashboard:view",
    "audit_log:view",
  ],
  ADMIN: [
    "org:update",
    "team:invite",
    "team:manage",
    "project:create",
    "project:edit",
    "project:delete",
    "crawl:execute",
    "ai:generate",
    "ads:edit",
    "ads:export",
    "report:export",
    "dashboard:view",
    "audit_log:view",
  ],
  MANAGER: [
    "project:create",
    "project:edit",
    "crawl:execute",
    "ai:generate",
    "ads:edit",
    "ads:export",
    "report:export",
    "dashboard:view",
  ],
  EDITOR: ["ai:generate", "ads:edit", "report:export", "dashboard:view"],
  VIEWER: ["dashboard:view", "report:export"],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(permission);
}
