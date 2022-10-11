import {GoodsComponent, CreateComponent, CustomersComponent, RolesComponent, OrderComponent} from '../barrel/pages';
import {AdminGuard } from '../guards/admin.guard';
import { ManagerGuard } from '../guards/manager.guard';
import { ModeratorGuard } from '../guards/moderator.guard';
import { AdminChartComponent } from '../pages/admin-chart/admin-chart.component';

export const pageRoute = [
    {path: 'goods',
        canActivate:[ModeratorGuard],
        component:GoodsComponent
    },
    {path: 'create',
        canActivate:[ModeratorGuard],
        component: CreateComponent
    },
    {path: 'customers',
        canActivate:[ManagerGuard],
        component: CustomersComponent
    },
    {path: 'order/:id',
        canActivate:[ManagerGuard],
        component: OrderComponent
    },
    {path: 'roles' , canActivate:[AdminGuard],
        component: RolesComponent
    },
    {path: 'chart', 
        component: AdminChartComponent
    }
];