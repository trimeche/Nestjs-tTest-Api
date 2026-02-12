import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersController } from './users.controller';
import { AppService } from './app.service';
import { User } from './user.entity';

@Module({
  imports: [
    // 1. Initialize Config (Reads the .env file)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Async Connection (Waits for ConfigService to get variables)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [User],
        synchronize: true, // Auto-creates table from entity
      }),
    }),
    // 3. Register the User entity for use in Controllers
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
