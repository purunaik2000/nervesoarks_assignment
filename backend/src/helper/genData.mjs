export const genUser = (data) => {
    return {
        ...data,
        vehicle_info: [],
        userInfo: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
}

export const genDealer = (data) => {
    return {
        ...data,
        dealership_info: {},
        cars: [],
        deals: [],
        sold_vehicles: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
}