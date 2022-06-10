const AuthenticationController = require("../AuthenticationController");
const { JWT_SIGNATURE_KEY } = require("../../../config/application");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models");


// ------------------ Authorize ------------------ //



// ------------------ End Authorize ------------------ //


// ------------------ Handle Login ------------------ //



// ------------------ End Handle Login ------------------ //



// ------------------ Handle Register ------------------ //


// ------------------ End Handle Register ------------------ //


// ------------------ Create Token From User ------------------ //

describe("createTokenFromUser", () => {
    it("should testing createTokenFromUser function", async () => {
        const mockUser = {
            id: 1,
            name: "sanlokaja",
            email: "sanlokaja@gmail.com",
            image: "sanlokaja.jpg",
        };

        const mockRole = {
            id: 1,
            name: "USER",
        };

        const token = jsonwebtoken.sign({
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            image: mockUser.image,
            role: {
                id: mockRole.id,
                name: mockRole.name,
            }
        }, JWT_SIGNATURE_KEY);

        const app = new AuthenticationController({ jwt: jsonwebtoken });

        const result = await app.createTokenFromUser(mockUser, mockRole);
        const finalResult = jest.fn();

        finalResult.mockReturnValue(result);

        expect(result).toEqual(token);
    });
});

// ------------------ End Create Token From User ------------------ //


// ------------------ Decode Token ------------------ //

describe("decodeToken", () => {
    it("should testing decodeToken function", async () => {
        const mockUser = {
            id: 1,
            name: "sanlokaja",
            email: "sanlokaja@gmail.com",
            image: "sanlokaja.jpg",
        };

        const mockRole = {
            id: 1,
            name: "USER",
        };

        const token = jsonwebtoken.sign({
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            image: mockUser.image,
            role: {
                id: mockRole.id,
                name: mockRole.name,
            }
        }, JWT_SIGNATURE_KEY);

        const decodedToken = jsonwebtoken.verify(token, JWT_SIGNATURE_KEY);

        const app = new AuthenticationController({ jwt: jsonwebtoken });

        const result = await app.decodeToken(token);

        expect(result).toEqual(decodedToken);
    });
});

// ------------------ End Decode Token ------------------ //


// ------------------ Encrypt Password ------------------ //

describe("encryptPassword", () => {
    it("should testing encryptPassword function", async () => {
        const password = "sanlokaja1234";
        const hashedPassword = bcrypt.hashSync(password, 10);

        const app = new AuthenticationController({
            jwt: jsonwebtoken,
            bcrypt: bcrypt,
        });

        const result = await app.encryptPassword(password);

        expect(result.slice(0, -53)).toEqual(hashedPassword.slice(0, -53));
    });
});

// ------------------ End Encrypt Password ------------------ //


// ------------------ Verify Password------------------ //

describe("verifyPassword", () => {
    it("should testing verifyPassword function", async () => {
        const password = "sanlokaja1234";

        const hashedPassword = bcrypt.hashSync(password, 10);

        const comparePassword = bcrypt.compareSync(password, hashedPassword)

        const app = new AuthenticationController({
            jwt: jsonwebtoken,
            bcrypt: bcrypt,
        });

        const result = await app.verifyPassword(password, hashedPassword);

        expect(result).toEqual(comparePassword);
    });
});

// ------------------ End Verify Password------------------ //
