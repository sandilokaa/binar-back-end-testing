const CarController = require("../CarController");
const { Car } = require("../../models")


// ------------------ Handle List Cars ------------------ //

// describe('handleListCar', () => {
//     it('should testing handleListCar function', async () => {
//         const payloadCar = {
//             name: "avanza veloz",
//             price: 359000,
//             size: "medium",
//             image: "https://toyotabatangas.com.ph/wp-content/uploads/2019/09/avanza-silver.png",
//             isCurrentlyRented: false,
//         };

//         const mockRequest = {
//             query: {
//                 page: 1,
//                 pageSize: 10
//             }
//         }
//         const mockCarModel = {}

//         const mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis()
//         };

//         const app = new CarController({
//             carModel: mockCarModel
//         })

//         await app.handleListCars(mockRequest, mockResponse);

//         const mockCar = new Car({ payloadCar });
//         mockCarModel.findAll = jest.fn().mockReturnValue(mockCar)

//         const carCount = mockCarModel.count = jest.fn().mockReturnValue({
//             where: query.where,
//             include: query.include
//         })

//         const query = app.getListQueryFromRequest(mockRequest)

//         app.buildPaginationObject(mockRequest, carCount)

//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//     });
// });

// ------------------ End Handle List Cars ------------------ //


// ------------------ Handle Get Car ------------------ //

describe("handleGetCar", () => {
    it("should testing handleGetCar function", async () => {

        const payloadCar = {
            name: "avanza veloz",
            price: 359000,
            size: "medium",
            image: "https://toyotabatangas.com.ph/wp-content/uploads/2019/09/avanza-silver.png",
            isCurrentlyRented: false,
        };

        const mockRequest = {
            params: {
                id: 1
            }
        };

        const mockCar = new Car({ payloadCar });

        const mockCarModel = {}

        mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar)
        
        const app = new CarController({ carModel: mockCarModel });

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        await app.handleGetCar(mockRequest, mockResponse);
        const getCarData = await app.getCarFromRequest(mockRequest);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(getCarData)
    });
});

// ------------------ End Handle Get Car ------------------ //


// ------------------ Handle Create Car ------------------ //

describe('handleCreateCar', () => {
    it('success result handleCreateCar function', async () => {
        const payloadCar = {
            name: "avanza veloz",
            price: 359000,
            size: "medium",
            image: "https://toyotabatangas.com.ph/wp-content/uploads/2019/09/avanza-silver.png",
            isCurrentlyRented: false,
        };

        const mockModel = {}

        const mockTest = new Car(payloadCar)

        mockModel.create = jest.fn().mockReturnValue(mockTest)

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };


        const mockRequest = {
            body: {
                payloadCar,
            }
        };

        const app = new CarController({
            carModel: mockModel
        });

        const hasil = mockModel.create(payloadCar)

        await app.handleCreateCar(mockRequest, mockResponse)

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(hasil);
    });

    it('error handleCreateCar function', async () => {
        const err = new Error("not Found!");

        const payloadCar = {
            name: "avanza veloz",
            price: 359000,
            size: "medium",
            image: "https://toyotabatangas.com.ph/wp-content/uploads/2019/09/avanza-silver.png",
            isCurrentlyRented: false,
        };

        const mockModel = {}

        new Car(payloadCar)

        mockModel.create = jest.fn().mockReturnValue(Promise.reject(err))

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };


        const mockRequest = {
            body: {
                payloadCar,
            }
        };

        const app = new CarController({
            carModel: mockModel
        });

        mockModel.create(payloadCar)

        await app.handleCreateCar(mockRequest, mockResponse)

        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: {
                name: err.name,
                message: err.message,
            }
        });
    });
});

// ------------------ End Handle Create Car ------------------ //


// ------------------ Get Car From Request ------------------ //

describe('getCarFromRequest', () => {
    it('should testing getCarFromRequest function', async () => {
        const payloadCar = {
            name: "avanza veloz",
            price: 359000,
            size: "medium",
            image: "https://toyotabatangas.com.ph/wp-content/uploads/2019/09/avanza-silver.png",
            isCurrentlyRented: false,
        };

        const mockRequest = {
            params: {
                id: 1
            }
        }

        const mockCar = new Car({
            payloadCar
        })
        const mockCarModel = {}
        mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar)

        const mockResponse = {};
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn().mockReturnThis();

        const carcontroller = new CarController({
            carModel: mockCarModel
        });
        const result = await carcontroller.getCarFromRequest(mockRequest);

        expect(result).toStrictEqual(mockCar)
    });
});

// ------------------ End Get Car From Request ------------------ //


// ------------------ Handle Update Car ------------------ //

// describe('handleUpdateCar', () => {
//     it('should testing handleUpdateCar function', async () => {
//         const mockRequest = {};
//         const {
//             name,
//             price,
//             size,
//             image,
//         } = mockRequest.body;

//         const mockCarModel = {};
//         const mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis()
//         }

//         const app = new CarController({
//             carModel: mockCarModel
//         })

//         const car = await app.getCarFromRequest(mockRequest);

//         await car.update({
//             name,
//             price,
//             size,
//             image,
//             isCurrentlyRented: false
//         })

//         await app.handleUpdateCar(mockRequest, mockResponse);

//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json), toHaveBeenCalledWith(car);
//     });
// });

// ------------------ End Handle Update Car ------------------ //


// ------------------ Handle Delete Car ------------------ //

// describe('handleDeleteCar', () => {
//     it('handleeleteCar', async () => {
//         const payloadCar = {
//             name: "brio",
//             price: 50000,
//             size: "large",
//             image: "https://upload.wikimedia.org/wikipedia/commons/0/07/2020_Honda_Brio_Satya_E_1.2_DD1_%2820211006%29.jpg",
//             isCurrentlyRented: false,
//         };

//         const mockRequest = {
//             params: {
//                 id: 1
//             }
//         }

//         const mockCar = new Car({
//             payloadCar
//         })

//         const mockCarModel = {}

//         mockCarModel.destroy = jest.fn().mockReturnValue(mockCar)

//         const mockResponse = {};

//         mockResponse.status = jest.fn().mockReturnThis();

//         mockResponse.end = jest.fn().mockReturnThis();

//         const carcontroller = new CarController({
//             carModel: mockCarModel
//         });
//         await carcontroller.handleDeleteCar(mockRequest, mockResponse);

//         expect(mockResponse.status).toHaveBeenCalledWith(204);
//         expect(mockResponse.end).toHaveBeenCalled()
//     });
// });

// ------------------ End Handle Delete Car ------------------ //