import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Interfaces
import { ValidRoles } from '../interfaces';
// Decorators
import { RoleProtected } from './role-protected.decorator';
// Guards
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
