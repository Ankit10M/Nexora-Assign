#  MOCCOM - E-Commerce Website

MOCCOM is a **full-stack MERN-based Mock e-commerce web application** that allows users to browse products, add them to a cart, update quantities, and perform checkout generating a dynamic receipt after order completion.

This project demonstrates a fully functional shopping cart system integrated with a Node.js and Express backend, MongoDB database, and a responsive React frontend.

---

##  Features

###  Frontend (React + Vite)
-  Product listing with dynamic grid layout  
-  Add, remove, and update items in cart  
-  Real-time cart synchronization with backend  
-  Checkout page with name, email, and address form  
-  Receipt page with order summary and total amount  
-  Toast notifications for actions (add, remove, checkout)  
-  Responsive design using **Tailwind CSS**

###  Backend (Node.js + Express + MongoDB)
- RESTful API with clean modular structure  
- CRUD operations for products and cart  
- Cart management (add, delete, update quantity)  
- Order checkout route that generates receipt with:
  - Unique Order ID  
  - Items purchased  
  - Total amount and timestamp  
- MongoDB models for Product and Cart  
- Automatic cart clearing post-checkout  
- Proper error handling and async functions

---

## Tech Stack

| **Frontend** | React (Vite), Tailwind CSS, React Router DOM, React Icons, React Hot Toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **State Management** | React Context API |
| **Version Control** | Git & GitHub |

