import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc, query, where, getDocs, onSnapshot, setDoc } from '@firebase/firestore';

import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userCollection: CollectionReference<DocumentData>;
  private productCollection: CollectionReference<DocumentData>;
  private categoryCollection: CollectionReference<DocumentData>;
  private orderCollection: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore) {

    this.orderCollection = collection(this.firestore, 'orders');
    this.productCollection = collection(this.firestore, 'products');
    this.userCollection = collection(this.firestore, 'users');
  }

  //USERS

  getUsers() {
    return collectionData(this.userCollection, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  getUser(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' }) as Observable<User>;
  }

  addUser(id: string, firstName: string, lastName: string, adress: string, number: string, email: string) {
    let user = {
      firstname: firstName,
      lastname: lastName,
      adress: adress,
      phone: number,
      username: email,
    };
    return setDoc(doc(this.firestore, 'users', `${id}`), user);
  }

  updateUser(user: User) {
    const userDocumentReference = doc(
      this.firestore,
      `users/${user.id}`
    );
    return updateDoc(userDocumentReference, { ...user });
  }

  deleteUser(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocumentReference);
  }

  //PRODUCTS

  getProducts() {
    return collectionData(this.productCollection, {
      idField: 'id',
    }) as Observable<Product[]>;
  }

  getProduct(id: string) {
    const productDocumentReference = doc(this.firestore, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  addProduct(product: Product) {
    return addDoc(this.productCollection, product);
  }

  updateProduct(product: Product) {
    const productDocumentReference = doc(
      this.firestore,
      `products/${product.id}`
    );
    return updateDoc(productDocumentReference, { ...product });
  }

  deleteProduct(id: string) {
    const productDocumentReference = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }

  //CATEGORIES

  getCategories() {
    return collectionData(this.categoryCollection, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  //ORDERS

  getOrders() {
    return collectionData(this.orderCollection, {
      idField: 'id',
    }) as Observable<Order[]>;
  }

  addOrder(order: Order) {
    return addDoc(this.orderCollection, order);
  }

  getOrderByUser(user: User) {
    let orders: any[] = [];
    const q = query(this.orderCollection, where("user", "==", user))
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id })
      })
    })
    return orders;
  }

  deleteOrder(id: string) {
    const orderDocumentReference = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderDocumentReference);
  }
}