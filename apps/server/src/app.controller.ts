import { Controller, Get, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly dbService: DbService) {}

  @Put()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Error creating user' })
  async setUser(@Body() data: { name: string; email: string }) {
    try {
      const user = await this.dbService.user.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });

      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      return {
        message: 'Error creating user',
        error,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(): Promise<User[]> {
    const users = await this.dbService.user.findMany();
    console.log(users);

    return users;
  }
}
