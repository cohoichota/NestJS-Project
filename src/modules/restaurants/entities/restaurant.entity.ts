import { Like } from 'src/modules/likes/entities/like.entity';
import { Menu } from 'src/modules/menus/entities/menu.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'restaurants' }) // Optional: specify the table name
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field as the primary key

  @OneToMany(() => Review, (review) => review.user) // Establish one-to-many relationship with Review
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.restaurant) // Establish one-to-many relationship with Order
  orders: Order[];

  @OneToMany(() => Menu, (menu) => menu.orderDetails) // Establish one-to-many relationship with Order-Detail
  menus: Menu[];

  @OneToMany(() => Like, (like) => like.restaurant) // Establish one-to-many relationship with Like
  likes: Like[];

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column({ type: 'decimal', nullable: true }) // Use decimal for rating, allows null values if not applicable
  rating: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // Optional: timestamp for updates
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Optional: timestamp for creation
  createdAt: Date;
}
