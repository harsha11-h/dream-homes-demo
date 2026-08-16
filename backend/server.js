const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// ===============================
// TEST ROUTES
// ===============================

app.get("/", function (req, res) {
    res.send("🏠 Dream Homes Backend is Running!");
});

app.get("/api/test", function (req, res) {
    res.json({
        success: true,
        message: "Dream Homes API is working!"
    });
});


// ===============================
// USER REGISTRATION
// ===============================

app.post("/api/register", async function(req, res) {

    const {
        name,
        email,
        password
    } = req.body;

    if (!name || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please fill all registration fields."
        });

    }

    const existingUser = db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
    `).get(email);

    if (existingUser) {

        return res.json({
            success: false,
            message: "Email already registered."
        });

    }

    const insertUser = db.prepare(`
        INSERT INTO users
        (name, email, password)
        VALUES (?, ?, ?)
    `);

const hashedPassword = await bcrypt.hash(password, 10);

insertUser.run(
    name,
    email,
    hashedPassword
);

    res.json({
        success: true,
        message: "Registration successful!"
    });

});


// ===============================
// USER LOGIN
// ===============================

app.post("/api/login", async function(req, res) {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please enter Email and Password."
        });

    }

    const user = db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {

        return res.json({
            success: false,
            message: "Invalid email or password."
        });

    }

const passwordMatch = await bcrypt.compare(
    password,
    user.password
);

if (!passwordMatch) {

    return res.json({
        success: false,
        message: "Invalid email or password."
    });

}

    res.json({
        success: true,
        message: "Login successful!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });

});

// ===============================
// FORGOT PASSWORD
// ===============================

app.put("/api/forgot-password", function (req, res) {

    const {
        email,
        newPassword
    } = req.body;

    if (!email || !newPassword) {

        return res.status(400).json({
            success: false,
            message: "Please enter email and new password."
        });

    }

    const user = db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {

        return res.json({
            success: false,
            message: "Email is not registered."
        });

    }

    db.prepare(`
        UPDATE users
        SET password = ?
        WHERE email = ?
    `).run(
        newPassword,
        email
    );

    res.json({
        success: true,
        message: "Password changed successfully!"
    });

});
// ===============================
// INQUIRIES
// ===============================

app.post("/api/inquiries", function (req, res) {

    const {
        name,
        phone,
        property,
        message
    } = req.body;

    if (!name || !phone || !property || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill all inquiry fields."
        });

    }

    const insertInquiry = db.prepare(`
        INSERT INTO inquiries
        (name, phone, property, message)
        VALUES (?, ?, ?, ?)
    `);

    insertInquiry.run(
        name,
        phone,
        property,
        message
    );

    res.json({
        success: true,
        message: "Inquiry saved successfully!"
    });

});


app.get("/api/inquiries", function (req, res) {

    const inquiries = db.prepare(`
        SELECT *
        FROM inquiries
        ORDER BY created_at DESC
    `).all();

    res.json({
        success: true,
        inquiries: inquiries
    });

});


app.delete("/api/inquiries/:id", function (req, res) {

    const id = req.params.id;

    const result = db.prepare(`
        DELETE FROM inquiries
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {

        return res.json({
            success: false,
            message: "Inquiry not found."
        });

    }

    res.json({
        success: true,
        message: "Inquiry deleted successfully."
    });

});


app.delete("/api/inquiries", function (req, res) {

    db.prepare(`
        DELETE FROM inquiries
    `).run();

    res.json({
        success: true,
        message: "All inquiries deleted successfully."
    });

});


app.put("/api/inquiries/:id", function (req, res) {

    const id = req.params.id;

    const {
        name,
        phone,
        property,
        message
    } = req.body;

    if (!name || !phone || !property || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill all inquiry fields."
        });

    }

    const result = db.prepare(`
        UPDATE inquiries
        SET
            name = ?,
            phone = ?,
            property = ?,
            message = ?
        WHERE id = ?
    `).run(
        name,
        phone,
        property,
        message,
        id
    );

    if (result.changes === 0) {

        return res.json({
            success: false,
            message: "Inquiry not found."
        });

    }

    res.json({
        success: true,
        message: "Inquiry updated successfully!"
    });

});


// ===============================
// PROPERTY VISIT BOOKINGS
// ===============================

app.post("/api/bookings", function (req, res) {

    const {
        name,
        email,
        phone,
        property,
        date,
        time
    } = req.body;

    if (!name || !email || !phone || !property || !date || !time) {

        return res.status(400).json({
            success: false,
            message: "Please fill all booking fields."
        });

    }

    const insertBooking = db.prepare(`
        INSERT INTO bookings
        (name, email, phone, property, date, time)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertBooking.run(
        name,
        email,
        phone,
        property,
        date,
        time
    );

    res.json({
        success: true,
        message: "Property visit booked successfully!"
    });

});


app.get("/api/bookings", function (req, res) {

    const bookings = db.prepare(`
        SELECT *
        FROM bookings
        ORDER BY created_at DESC
    `).all();

    res.json({
        success: true,
        bookings: bookings
    });

});


app.delete("/api/bookings", function (req, res) {

    db.prepare(`
        DELETE FROM bookings
    `).run();

    res.json({
        success: true,
        message: "All bookings deleted successfully."
    });

});


// ===============================
// PROPERTIES
// ===============================

app.get("/api/properties", function (req, res) {

    const properties = db.prepare(`
        SELECT *
        FROM properties
        ORDER BY id
    `).all();

    res.json({
        success: true,
        properties: properties
    });

});


app.get("/api/properties/:id", function (req, res) {

    const id = req.params.id;

    const property = db.prepare(`
        SELECT *
        FROM properties
        WHERE id = ?
    `).get(id);

    if (!property) {

        return res.json({
            success: false,
            message: "Property not found."
        });

    }

    res.json({
        success: true,
        property: property
    });

});


app.post("/api/properties", function (req, res) {

    const {
        name,
        price,
        location,
        bedrooms,
        image
    } = req.body;

    if (!name || !price || !location || !bedrooms) {

        return res.status(400).json({
            success: false,
            message: "Please fill all property fields."
        });

    }

    const insertProperty = db.prepare(`
        INSERT INTO properties
        (name, price, location, bedrooms, image)
        VALUES (?, ?, ?, ?, ?)
    `);

    const result = insertProperty.run(
        name,
        Number(price),
        location,
        Number(bedrooms),
        image || "house1.jpg"
    );

    res.json({
        success: true,
        message: "Property added successfully!",
        propertyId: result.lastInsertRowid
    });

});


app.put("/api/properties", function (req, res) {

    const {
        oldName,
        name,
        price,
        location,
        bedrooms
    } = req.body;

    if (!oldName || !name || !price || !location || !bedrooms) {

        return res.status(400).json({
            success: false,
            message: "Please fill all property fields."
        });

    }

    const result = db.prepare(`
        UPDATE properties
        SET
            name = ?,
            price = ?,
            location = ?,
            bedrooms = ?
        WHERE name = ?
    `).run(
        name,
        price,
        location,
        bedrooms,
        oldName
    );

    if (result.changes === 0) {

        return res.json({
            success: false,
            message: "Property not found."
        });

    }

    res.json({
        success: true,
        message: "Property updated successfully!"
    });

});


app.delete("/api/properties/:id", function (req, res) {

    const id = req.params.id;

    const result = db.prepare(`
        DELETE FROM properties
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {

        return res.json({
            success: false,
            message: "Property not found."
        });

    }

    res.json({
        success: true,
        message: "Property deleted successfully!"
    });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, function () {

    console.log(`🏠 Server running at http://localhost:${PORT}`);

});