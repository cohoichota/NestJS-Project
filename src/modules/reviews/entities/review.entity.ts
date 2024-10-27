import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'reviews' }) // Optional: specify the table name
export class Review {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field as the primary key

  @ManyToOne(() => User, (user) => user.reviews, { eager: true }) // Optional: Set eager loading if desired
  @JoinColumn({ name: 'user_id' }) // Specify the foreign key column name in the table
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    eager: true,
  })
  @JoinColumn({ name: 'restaurant_id' }) // Specify the foreign key column name in the table
  restaurant: Restaurant;

  @Column({ type: 'int' }) // Set the type of rating
  rating: number;

  @Column({ nullable: true }) // Allow image to be optional
  image: string;

  @Column({ type: 'text', nullable: true }) // Use 'text' for longer comments
  comment: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // Optional: timestamp for updates
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Optional: timestamp for creation
  createdAt: Date;
}
