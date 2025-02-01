import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private http: HttpClient) {}

  payWithStripe() {
    const data = new HttpParams({
      fromObject: {
        order: JSON.stringify([{"_id": "64087e249ef5e4db7bda29ab","restaurant_id": "6406bf1a06cb82b471ed2420","category_id": "6406bf1a06cb82b471ed2421","name": "Burger","description": "Its a great mixture of Paneer and certain veggies in a Burger","cover": "src/uploads/itemImages/1678278179961-3432490313.jpg","price": 150,"veg": true,"status": true,"created_at": "2023-03-08T12:16:02.953Z","updated_at": "2023-03-08T12:16:02.953Z","__v": 0, "quantity":"1"},{"_id": "6408afc613da529274cecc19","restaurant_id": "6406bf1a06cb82b471ed2420","category_id": "6406bf1a06cb82b471ed2422","name": "Italian Pasta","description": "Pasta with extra tomatoes","cover": "src/uploads/itemImages/1678290886168-72130811pasta.jpg","price": 100,"veg": true,"status": true,"created_at": "2023-03-08T13:04:12.775Z","updated_at": "2023-03-08T13:04:12.775Z","__v": 0, "quantity":"2"}]),
        deliveryCharge: 20
      }
    });
    this.http.post<any>('http://localhost:3000/api/order/stripeCheckout', data).pipe(take(1)).subscribe({
      next: async(session) => {
        const stripe = await loadStripe('your_publishable_key');
        stripe?.redirectToCheckout({
          sessionId: session.id
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
