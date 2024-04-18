import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { AuthGuard } from './guard/auth/auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptor/response/response.interceptor';
import { JwtAuthGuard } from './guard/jwt-auth/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

//console.log(process.env.MONGO_URI,"process.env.NODE_ENV",process.env.NODE_ENV);

const envFilePath = `${process.cwd()}/env/.env.${process.env.NODE_ENV}`;
console.log(process.env.JWT_SECRET,"JWT_SECRET",process.env.MONGO_URI);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath:`${process.env.NODE_ENV}.env`
      envFilePath
    }),
    // MailerModule.forRoot({
    //   transport:{
    //     host:'smtp.gmail.com',
    //     auth:{
    //       user:'mss.rajnikant1993@gmail.com',
    //       pass:'jqpbajqwzpnardvw'
    //     }
    //   }
    // }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    BrandModule,
    CategoriesModule,
    OrderModule,
    ProductsModule,
    UsersModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  //   {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // }
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },

  
],
})
export class AppModule {}
