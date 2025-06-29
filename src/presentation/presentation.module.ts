import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { StrategiesModule } from './strategies/strategies.module';
import { GuardsModule } from './quards/guards.module';

@Module({
  imports: [StrategiesModule, GuardsModule, ControllersModule],
})
export class PresentationModule {}
