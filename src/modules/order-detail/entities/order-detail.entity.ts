import { MenuItemOption } from 'src/modules/menu-item-options/entities/menu-item-option.entity';
import { MenuItem } from 'src/modules/menu-items/entities/menu-item.entity';
import { Menu } from 'src/modules/menus/entities/menu.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_details' }) // Optional: specify the table name
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field as the primary key

  @ManyToOne(() => Order, (order) => order.orderDetails, { eager: true }) // Establish the relationship with Order
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.orderDetails, { eager: true }) // Establish the relationship with Menu
  menu: Menu;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderDetails, {
    eager: true,
  }) // Establish the relationship with MenuItem
  menuItem: MenuItem;

  @ManyToOne(
    () => MenuItemOption,
    (menuItemOption) => menuItemOption.orderDetails,
    { eager: true },
  ) // Establish the relationship with MenuItemOption
  menuItemOption: MenuItemOption;

  // If you want to include timestamps, add these fields:
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
