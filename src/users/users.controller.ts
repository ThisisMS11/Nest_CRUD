import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /* to register a new user */
    @Post()
    create(@Body() user: User) {
        return this.usersService.create(user);
    }

    /* to find all the users */
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    /* to get a single user */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    /* to update the info about a single user */
    @Patch(':id')
    update(@Param('id') id: string, @Body() user: User) {
        return this.usersService.update(+id, user);
    }

    /* to delete a user */
    @Delete(':id')
    remove(@Param('id') id: string,@Body() data: {userId:Number}) {
        return this.usersService.remove(+id,data);
    }
}
