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

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport:{
    //     host:'smtp.gmail.com',
    //     auth:{
    //       user:'mss.rajnikant1993@gmail.com',
    //       pass:'jqpbajqwzpnardvw'
    //     }
    //   }
    // }),
    MongooseModule.forRoot(`mongodb+srv://sardabharat71:S%40rda1809@ecommerce.7akgctz.mongodb.net/`),
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
