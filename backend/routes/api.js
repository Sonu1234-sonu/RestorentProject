import express from 'express'
import { registerUser, loginUser, getProfile } from '../controller/authController.js'
import { createReservation, listReservations, updateReservation, deleteReservation } from '../controller/reservationController.js'
import { createOrder, listMyOrders, listOrders, updateOrder } from '../controller/orderController.js'
import { listMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../controller/menuController.js'
import { listEvents, createEvent, updateEvent, deleteEvent } from '../controller/eventController.js'
import {
    listUsers,
    getUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
} from '../controller/userController.js'
import {
    listCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} from '../controller/couponController.js'
import {
    listReviews,
    updateReviewStatus,
    deleteReview,
} from '../controller/reviewController.js'
import {
    listInventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
} from '../controller/inventoryController.js'
import {
    listEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../controller/employeeController.js'
import {
    listContacts,
    createContact,
    updateContact,
    deleteContact,
} from '../controller/contactController.js'
import { authenticateUser, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.get('/auth/profile', authenticateUser, getProfile)

router.post('/reservations', createReservation)
router.get('/reservations', authenticateUser, requireAdmin, listReservations)
router.put('/reservations/:id', authenticateUser, requireAdmin, updateReservation)
router.delete('/reservations/:id', authenticateUser, requireAdmin, deleteReservation)

router.post('/orders', authenticateUser, createOrder)
router.get('/orders/me', authenticateUser, listMyOrders)
router.get('/orders', authenticateUser, requireAdmin, listOrders)
router.put('/orders/:id', authenticateUser, requireAdmin, updateOrder)

router.get('/menu', listMenu)
router.post('/menu', authenticateUser, requireAdmin, createMenuItem)
router.put('/menu/:id', authenticateUser, requireAdmin, updateMenuItem)
router.delete('/menu/:id', authenticateUser, requireAdmin, deleteMenuItem)

router.get('/events', listEvents)
router.post('/events', authenticateUser, requireAdmin, createEvent)
router.put('/events/:id', authenticateUser, requireAdmin, updateEvent)
router.delete('/events/:id', authenticateUser, requireAdmin, deleteEvent)

router.get('/users', authenticateUser, requireAdmin, listUsers)
router.get('/users/:id', authenticateUser, requireAdmin, getUser)
router.put('/users/:id', authenticateUser, requireAdmin, updateUser)
router.delete('/users/:id', authenticateUser, requireAdmin, deleteUser)
router.patch('/users/:id/block', authenticateUser, requireAdmin, blockUser)
router.patch('/users/:id/unblock', authenticateUser, requireAdmin, unblockUser)

router.get('/coupons', authenticateUser, requireAdmin, listCoupons)
router.post('/coupons', authenticateUser, requireAdmin, createCoupon)
router.put('/coupons/:id', authenticateUser, requireAdmin, updateCoupon)
router.delete('/coupons/:id', authenticateUser, requireAdmin, deleteCoupon)

router.get('/reviews', authenticateUser, requireAdmin, listReviews)
router.patch('/reviews/:id', authenticateUser, requireAdmin, updateReviewStatus)
router.delete('/reviews/:id', authenticateUser, requireAdmin, deleteReview)

router.get('/inventory', authenticateUser, requireAdmin, listInventory)
router.post('/inventory', authenticateUser, requireAdmin, createInventoryItem)
router.put('/inventory/:id', authenticateUser, requireAdmin, updateInventoryItem)
router.delete('/inventory/:id', authenticateUser, requireAdmin, deleteInventoryItem)

router.get('/employees', authenticateUser, requireAdmin, listEmployees)
router.post('/employees', authenticateUser, requireAdmin, createEmployee)
router.put('/employees/:id', authenticateUser, requireAdmin, updateEmployee)
router.delete('/employees/:id', authenticateUser, requireAdmin, deleteEmployee)

router.get('/contacts', authenticateUser, requireAdmin, listContacts)
router.post('/contacts', createContact)
router.put('/contacts/:id', authenticateUser, requireAdmin, updateContact)
router.delete('/contacts/:id', authenticateUser, requireAdmin, deleteContact)

export default router
