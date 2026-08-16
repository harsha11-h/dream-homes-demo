// ===============================
// EMI Calculator
// ===============================

function calculateEMI() {

    let price = Number(document.getElementById("price").value);
    let years = Number(document.getElementById("years").value);
    let interest = Number(document.getElementById("interest").value);

    if (price === 0 || years === 0 || interest === 0) {
        alert("Please fill all fields!");
        return;
    }

    let monthlyRate = interest / 12 / 100;
    let months = years * 12;

    let emi =
        (price * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

document.getElementById("emiResult").innerHTML =
    "Estimated Monthly EMI: ₹ " + emi.toFixed(2);
}

// ===============================
// Search Property
// ===============================

function searchProperty() {

    let location = document.getElementById("location").value.toLowerCase();

    let propertyType = document.getElementById("propertyType").value.toLowerCase();

    let budget = document.getElementById("budget").value;
    let sortPrice = document.getElementById("sortPrice").value;

    let bedrooms = document.getElementById("bedrooms").value;

    let properties = document.querySelectorAll(".property-card");
    let propertyArray = Array.from(properties);

    let found = false;

    properties.forEach(function(property){

        let city = property.getAttribute("data-location");

        let type = property.getAttribute("data-type");

        let price = Number(property.getAttribute("data-price"));
        let beds = property.getAttribute("data-bedrooms");

        let matchLocation =
            location === "" || city.includes(location);

        let matchType =
            propertyType === "" || type === propertyType;
            let matchBudget =
    budget === "" || price <= Number(budget);
    let matchBedrooms =
    bedrooms === "" || beds === bedrooms;

if(matchLocation && matchType && matchBudget && matchBedrooms){

    property.style.display = "inline-block";

    found = true;

}else{

    property.style.display = "none";

}

    });
    if (sortPrice === "low") {

    propertyArray.sort(function(a, b) {
        return Number(a.getAttribute("data-price")) -
               Number(b.getAttribute("data-price"));
    });

}

if (sortPrice === "high") {

    propertyArray.sort(function(a, b) {
        return Number(b.getAttribute("data-price")) -
               Number(a.getAttribute("data-price"));
    });

}
let propertyContainer = document.querySelector(".properties");

propertyArray.forEach(function(property) {
    propertyContainer.appendChild(property);
});
    if(found){

    document.getElementById("noResult").style.display = "none";

}else{

    document.getElementById("noResult").style.display = "block";

}

}
function resetFilters() {

    document.getElementById("location").value = "";
    document.getElementById("propertyType").value = "";
    document.getElementById("budget").value = "20000000";
    document.getElementById("bedrooms").value = "";
    document.getElementById("sortPrice").value = "";

    let properties = document.querySelectorAll(".property-card");

    properties.forEach(function(property) {
        property.style.display = "inline-block";
    });

    document.getElementById("noResult").style.display = "none";

}
// ===============================
// Save Property
// ===============================

function saveProperty() {

    let saved = localStorage.getItem("villa");

    if(saved){

        localStorage.removeItem("villa");

        document.querySelector(".save-action").innerHTML =
        "❤️ Save Property";

    }else{

        localStorage.setItem("villa","Luxury Villa");

        document.querySelector(".save-action").innerHTML =
        "❤️ Saved";

    }

}

window.onload = function(){

    let btn = document.querySelector(".save-action");

    if(btn && localStorage.getItem("villa")){

        btn.innerHTML = "❤️ Saved";

    }

}

// ===============================
// Property Image Gallery
// ===============================

let images = [
    "images/house1.jpg",
    "images/house2.jpg",
    "images/house3.jpg",
    "images/house4.jpg",
    "images/house5.jpg",
    "images/house6.jpg"
];

let currentImage = 0;

function openImage(image){


    currentImage = images.indexOf(image);

    if(currentImage === -1){
        currentImage = 0;
    }

    document.getElementById("imagePopup").style.display = "flex";
    document.getElementById("popupImage").src = images[currentImage];
}
function closeImage(){

    document.getElementById("imagePopup").style.display = "none";

}

function nextImage(){

    currentImage++;

    if(currentImage >= images.length){
        currentImage = 0;
    }

    document.getElementById("popupImage").src = images[currentImage];

}

function previousImage(){

    currentImage--;

    if(currentImage < 0){
        currentImage = images.length - 1;
    }

    document.getElementById("popupImage").src = images[currentImage];

}

// Auto Image Slider

let slideIndex = 0;


// Image Slider

let currentSlide = 0;

function showSlide(index) {

    const slides = document.querySelectorAll(".slide");

    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slides[currentSlide].style.display = "block";
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

showSlide(0);

setInterval(nextSlide, 3000);
document.addEventListener("keydown", function(event) {

    const imagePopup = document.getElementById("imagePopup");

    if (!imagePopup) {
        return;
    }

    if (imagePopup.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

        if (event.key === "Escape") {
            closeImage();
        }

    }

});
// Hero Slider

let heroImages = [
    "images/house1.jpg",
    "images/house2.jpg",
    "images/house3.jpg",
    "images/house4.jpg",
    "images/house5.jpg",
    "images/house6.jpg"
];

let heroIndex = 0;

setInterval(function(){

    let hero = document.getElementById("heroImage");

    if(hero){

        heroIndex++;

        if(heroIndex >= heroImages.length){
            heroIndex = 0;
        }

        hero.src = heroImages[heroIndex];

    }

}, 4000);
let budgetSlider = document.getElementById("budget");
let budgetValue = document.getElementById("budgetValue");

if (budgetSlider && budgetValue) {

    budgetSlider.oninput = function () {

        budgetValue.innerHTML =
            "₹" + Number(this.value).toLocaleString("en-IN");

        searchProperty();

    };

}
function sortProperties() {

    let sort = document.getElementById("sortPrice").value;

    let container = document.querySelector(".properties");

    let properties = Array.from(document.querySelectorAll(".property-card"));

    properties.sort(function(a, b) {

        let priceA = Number(a.dataset.price);
        let priceB = Number(b.dataset.price);

        if (sort === "low") {
            return priceA - priceB;
        }

        if (sort === "high") {
            return priceB - priceA;
        }

        return 0;

    });

    properties.forEach(function(property) {
        container.appendChild(property);
    });

}
// ===============================
// Wishlist
// ===============================

let wishlist = Number(localStorage.getItem("wishlist")) || 0;

let wishlistCount = document.getElementById("wishlistCount");

if (wishlistCount) {
    wishlistCount.innerHTML = wishlist;
}
let wishlistCard = document.getElementById("wishlistCard");

if (wishlistCard) {
    wishlistCard.innerHTML =
        Number(localStorage.getItem("wishlist")) || 0;
}

function addToWishlist() {

    wishlist++;

    localStorage.setItem("wishlist", wishlist);

    let wishlistCount = document.getElementById("wishlistCount");

    if (wishlistCount) {
        wishlistCount.innerHTML = wishlist;
    }

}

function clearWishlist() {

    let confirmClear = confirm("Are you sure you want to clear your wishlist?");

    if (confirmClear) {

        wishlist = 0;

        localStorage.setItem("wishlist", wishlist);

        let wishlistCount = document.getElementById("wishlistCount");

        if (wishlistCount) {
            wishlistCount.innerHTML = wishlist;
        }

    }

}
let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
console.log("Compare List:");
console.log(compareList);



function addToCompare(name, price, location, bedrooms, button) {

    let compareList =
        JSON.parse(localStorage.getItem("compareList")) || [];

    // Check if this property is already compared
    let exists = compareList.some(function(item) {
        return item.name === name;
    });

    if (exists) {
        alert(name + " is already in comparison.");
        return;
    }



    let property = {
        name: name,
        price: price,
        location: location,
        bedrooms: bedrooms,

        image:
            name === "Luxury Villa" ? "images/house1.jpg" :
            name === "Modern Apartment" ? "images/house2.jpg" :
            "images/house3.jpg",

        bathrooms:
            name === "Luxury Villa" ? "3" :
            name === "Modern Apartment" ? "2" :
            "4",

        area:
            name === "Luxury Villa" ? "2800 Sq.ft" :
            name === "Modern Apartment" ? "1800 Sq.ft" :
            "3200 Sq.ft",

        rating:
            name === "Luxury Villa" ? "⭐⭐⭐⭐⭐" :
            name === "Modern Apartment" ? "⭐⭐⭐⭐☆" :
            "⭐⭐⭐⭐⭐",

        recommended: false
    };

    // Add property
    compareList.push(property);

    // Save to browser
    localStorage.setItem(
        "compareList",
        JSON.stringify(compareList)
    );

    // Update display
    updateCompareTable();

    // Change button
    if (button) {
        button.innerHTML = "✅ Compared";
    }

    alert(name + " added for comparison.");
}

function updateCompareTable() {

    compareList =
        JSON.parse(localStorage.getItem("compareList")) || [];

    let table =
        document.getElementById("compareTable");

    let compareCount =
        document.getElementById("compareCount");

    if (compareCount) {

        compareCount.innerHTML =
            compareList.length;

    }

    if (!table) {
        return;
    }
    table.innerHTML = `
        <tr>
            <th>Property</th>
            <th>Price</th>
            <th>Location</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Area</th>
            <th>Rating</th>
            <th>Wishlist</th>
            <th>Action</th>
        </tr>
    `;


    compareList.forEach(function(property) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML =
`
${property.name === "Luxury Villa" ? '<span class="best-choice">🏆 BEST CHOICE</span>' : ""}
<br>

<img
    src="${property.image}"
    width="100"
    style="cursor:pointer;"
    onclick="openImage('${property.image}')"
>

<br>

${property.name}
`;

        row.insertCell(1).innerHTML = "₹" + property.price;

        row.insertCell(2).innerHTML = property.location;

        row.insertCell(3).innerHTML = property.bedrooms;

        row.insertCell(4).innerHTML = property.bathrooms;

row.insertCell(5).innerHTML = property.area;

row.insertCell(6).innerHTML = property.rating;

        row.insertCell(7).innerHTML = "❤️ Saved";

        row.insertCell(8).innerHTML =
        '<button onclick="removeCompare(\'' + property.name + '\')">🗑 Remove</button>';

    });


    let message = document.getElementById("noCompareMessage");

    if (message) {

        if (compareList.length === 0) {
            message.style.display = "block";
        } 
        else {
            message.style.display = "none";
        }

    }


let summary = document.getElementById("compareSummary");

if(summary){

    summary.innerHTML = `
    <h3>📊 Comparison Summary</h3>

    🏆 Recommended Property: Luxury Villa<br><br>

    ⭐ Best Rating: Luxury Villa<br><br>

    📐 Largest Area: Family Home
    `;

}

}


// ===============================
// Book Property Visit
// ===============================

function bookVisit() {

    let name = document.getElementById("visitorName").value;
    let email = document.getElementById("visitorEmail").value;
    let phone = document.getElementById("visitorPhone").value;
    let property = document.getElementById("visitProperty").value;
    let date = document.getElementById("visitDate").value;
    let time = document.getElementById("visitTime").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        property === "" ||
        date === "" ||
        time === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
        name: name,
        email: email,
        phone: phone,
        property: property,
        date: date,
        time: time
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("✅ Property Visit Booked Successfully!");

    document.getElementById("visitorName").value = "";
    document.getElementById("visitorEmail").value = "";
    document.getElementById("visitorPhone").value = "";
    document.getElementById("visitProperty").value = "";
    document.getElementById("visitDate").value = "";
    document.getElementById("visitTime").value = "";
}
function removeCompare(propertyName){

    compareList = compareList.filter(function(property){

        return property.name !== propertyName;

    });

    localStorage.setItem(
        "compareList",
        JSON.stringify(compareList)
    );

    updateCompareTable();

}
function clearCompare(){

    compareList = [];

    localStorage.removeItem("compareList");

    updateCompareTable();

    alert("Comparison cleared.");

}
window.addEventListener("load", function(){

    updateCompareTable();

});
function testCompare(){

    localStorage.setItem("compareList","TEST");

    alert("Saved");

}
function rateProperty(id){

    let rating = prompt("Rate this property (1 to 5)");

    if(rating >= 1 && rating <= 5){

        let stars = "";

        for(let i = 0; i < rating; i++){
            stars += "⭐";
        }

        document.getElementById(id).innerHTML =
            stars + " (" + rating + "/5)";
    }
    else{
        alert("Please enter a number between 1 and 5.");
    }

}
function openProperty(page) {
    window.location.href = page;
}
function shareProperty() {

    if (navigator.share) {

        navigator.share({
            title: "Dream Homes",
            text: "Check out this beautiful property!",
            url: window.location.href
        });

    } else {

        alert("Sharing is not supported on this browser.");

    }

}
function printProperty() {

    window.print();

}

async function sendEnquiry() {

    let form = document.getElementById("contactForm");

    let name =
        document.getElementById("contactName").value.trim();

    let email =
        document.getElementById("contactEmail").value.trim();

    let phone =
        document.getElementById("contactPhone").value.trim();

    let message =
        document.getElementById("contactMessage").value.trim();

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/inquiries",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    property: "Luxury Villa",
                    message: message
                })
            }
        );

        const data = await response.json();

        console.log("Enquiry response:", data);

        if (data.success) {

            alert("✅ Enquiry sent successfully!");

            form.reset();

        } else {

            alert("❌ Enquiry could not be saved.");

        }

    } catch (error) {

        console.error("Enquiry error:", error);

        alert("❌ Could not connect to the backend. Make sure your Node server is running.");

    }

}
function calculateEMI() {

    let price = Number(document.getElementById("price").value);

    let years = Number(document.getElementById("years").value);

    let interest = Number(document.getElementById("interest").value);

    if(price === 0 || years === 0 || interest === 0){

        alert("Please fill all fields.");

        return;

    }

    let monthlyInterest = interest / 12 / 100;

    let months = years * 12;

    let emi =
    (price * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
    (Math.pow(1 + monthlyInterest, months) - 1);

    let totalAmount = emi * months;
let totalInterest = totalAmount - price;
document.getElementById("emiResult").innerHTML =
"💰 Monthly EMI: ₹" + emi.toLocaleString("en-IN", {maximumFractionDigits:2}) +
"<br><br>💸 Total Interest: ₹" + totalInterest.toLocaleString("en-IN", {maximumFractionDigits:2}) +
"<br><br>🏦 Total Payment: ₹" + totalAmount.toLocaleString("en-IN", {maximumFractionDigits:2});

}
function calculateEligibility() {

    let salary = Number(document.getElementById("salary").value);

    let existingEmi = Number(document.getElementById("existingEmi").value);

    let years = Number(document.getElementById("loanYears").value);

    if (salary === 0 || years === 0) {

        alert("Please fill all fields.");

        return;

    }

    let availableEmi = (salary * 0.5) - existingEmi;

    if (availableEmi <= 0) {

        document.getElementById("loanResult").innerHTML =
        "❌ You are currently not eligible for a new loan.";

        return;

    }

    let estimatedLoan = availableEmi * years * 12;

    document.getElementById("loanResult").innerHTML =
    "✅ Estimated Loan Eligibility: ₹" +
    estimatedLoan.toLocaleString("en-IN", {
        maximumFractionDigits: 2
    });

}

function zoomInImage() {
    document.getElementById("popupImage").style.transform = "scale(1.5)";
}

function zoomOutImage() {
    document.getElementById("popupImage").style.transform = "scale(1)";
}

function downloadComparePDF() {

    let element = document.getElementById("compareTable");

    if (!element) {
        alert("Compare table not found.");
        return;
    }

    html2pdf(element, {
        margin: 10,
        filename: "DreamHomes-Comparison.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape"
        }
    });

}
function shareComparison() {

    if (navigator.share) {

        navigator.share({
            title: "Dream Homes - Property Comparison",
            text: "Compare these amazing properties from Dream Homes!",
            url: window.location.href
        });

    } else {

        navigator.clipboard.writeText(window.location.href);

        alert("✅ Link copied to clipboard!");

    }

}

function downloadBrochure() {

    let element = document.querySelector(".comparison");

    if (!element) {

        alert("Brochure content not found.");

        return;

    }

    html2pdf(element, {

        margin: 10,

        filename: "DreamHomes-Brochure.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        }

    });

}
function printComparison() {

    window.print();

}

function saveRecentlyViewed(name, image, price, location) {

    let recent = JSON.parse(localStorage.getItem("recentProperties")) || [];

    let property = {
        name: name,
        image: image,
        price: price,
        location: location
    };

    recent = recent.filter(function(item) {
        return item.name !== name;
    });

    recent.unshift(property);

    if (recent.length > 5) {
        recent.pop();
    }

    localStorage.setItem(
        "recentProperties",
        JSON.stringify(recent)
    );

}

function loadRecentlyViewed() {

    let container = document.getElementById("recentProperties");

    if (!container) {
        return;
    }

    let recent =
        JSON.parse(localStorage.getItem("recentProperties")) || [];

    if (recent.length === 0) {

        container.innerHTML =
            "No recently viewed properties.";

        return;
    }

    container.innerHTML = "";

    recent.forEach(function(property) {

        container.innerHTML += `
        <div class="recent-card">

            <img src="${property.image}" width="150">

            <h3>${property.name}</h3>

            <p>${property.price}</p>

            <p>📍 ${property.location}</p>

        </div>
        `;

    });

}
window.addEventListener("load", function () {

    loadRecentlyViewed();

    updateViewCount();

    updatePropertyStatus();

});
function updateViewCount() {

    let view = localStorage.getItem("viewCount1");

    if (view === null) {
        view = 0;
    }

    view++;

    localStorage.setItem("viewCount1", view);

    let count = document.getElementById("viewCount1");

    if (count) {
        count.innerHTML = "👁️ Viewed " + view + " times";
    }

}
function resetViewCount() {

    localStorage.setItem("viewCount1", 0);

    updateViewCount();

    alert("✅ View count has been reset.");

}
function updatePropertyStatus() {

    let status = document.getElementById("propertyStatus");

    if (!status) {
        return;
    }

    let savedStatus = localStorage.getItem("propertyStatus1");

    if (!savedStatus) {
        savedStatus = "Available";
        localStorage.setItem("propertyStatus1", savedStatus);
    }

    if (savedStatus === "Available") {

   status.innerHTML = "🟢 Available";
        status.className = "status-available";

    }
    else if (savedStatus === "Booked") {

        status.innerHTML = "🟡 Booked";
        status.className = "status-booked";

    }
    else if (savedStatus === "Sold") {

        status.innerHTML = "🔴 Sold";
        status.className = "status-sold";

    }

}
function setPropertyStatus(status) {

    localStorage.setItem("propertyStatus1", status);

    updatePropertyStatus();

}



async function saveInquiry() {

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let property = document.getElementById("propertyName").value;
    let message = document.getElementById("customerMessage").value;

    if (
        name === "" ||
        phone === "" ||
        property === "" ||
        message === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // ===============================
    // UPDATE EXISTING INQUIRY
    // ===============================

    if (editInquiryId !== null) {

        try {

            const response = await fetch(
                "http://localhost:3000/api/inquiries/" + editInquiryId,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone,
                        property: property,
                        message: message
                    })
                }
            );

            const data = await response.json();

            console.log("Update inquiry response:", data);

            if (!data.success) {
                alert("❌ Inquiry was not updated.");
                return;
            }

            alert("✅ Inquiry updated successfully!");

            editInquiryId = null;

            document.getElementById("customerName").value = "";
            document.getElementById("customerPhone").value = "";
            document.getElementById("propertyName").value = "";
            document.getElementById("customerMessage").value = "";

            loadDashboardInquiries();

            return;

        } catch (error) {

            console.error("Update inquiry error:", error);

            alert("❌ Could not update the inquiry.");

            return;
        }
    }

    // ===============================
    // ADD NEW INQUIRY
    // ===============================

    try {

        const response = await fetch("http://localhost:3000/api/inquiries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                property: property,
                message: message
            })
        });

        const data = await response.json();

        console.log("Save inquiry response:", data);

        if (!data.success) {
            alert("❌ Inquiry was not saved.");
            return;
        }

        alert("✅ Inquiry saved to database!");

        document.getElementById("customerName").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("propertyName").value = "";
        document.getElementById("customerMessage").value = "";

        loadDashboardInquiries();

    } catch (error) {

        console.error("Save inquiry error:", error);

        alert("❌ Could not connect to the backend.");

    }

}

async function deleteInquiry(id) {

    if (!confirm("⚠️ Are you sure you want to delete this inquiry?")) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/inquiries/" + id,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!data.success) {
            alert("❌ Could not delete inquiry.");
            return;
        }

        alert("✅ Inquiry deleted.");

        loadDashboardInquiries();

    } catch (error) {

        console.error("Delete inquiry error:", error);

        alert("❌ Backend connection error.");

    }
}
async function clearAllInquiries() {

    const confirmClear = confirm(
        "⚠️ Are you sure you want to delete ALL inquiries? This cannot be undone."
    );

    if (!confirmClear) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/inquiries",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {

            throw new Error(
                "Server returned HTTP " + response.status
            );

        }

        const data = await response.json();

        if (data.success) {

            alert("✅ All inquiries have been cleared.");

            location.reload();

        } else {

            alert("❌ " + data.message);

        }

    } catch (error) {

        console.error(
            "❌ Clear inquiries error:",
            error
        );

        alert(
            "❌ Clear failed: " + error.message
        );

    }

}
let editInquiryId = null;

async function editInquiry(id) {

    try {

        const response = await fetch(
            "http://localhost:3000/api/inquiries"
        );

        const data = await response.json();

        if (!data.success) {
            alert("❌ Could not load inquiries.");
            return;
        }

        const inquiry = data.inquiries.find(function(item) {
            return Number(item.id) === Number(id);
        });

        if (!inquiry) {
            alert("❌ Inquiry not found.");
            return;
        }

        document.getElementById("customerName").value =
            inquiry.name;

        document.getElementById("customerPhone").value =
            inquiry.phone;

        document.getElementById("propertyName").value =
            inquiry.property;

        document.getElementById("customerMessage").value =
            inquiry.message;

        editInquiryId = inquiry.id;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        alert("✏️ Inquiry loaded. You can now edit it.");

    } catch (error) {

        console.error("Edit inquiry error:", error);

        alert("❌ Could not load inquiry.");

    }
}
function searchInquiry() {

    let input = document.getElementById("searchInquiry").value.toLowerCase();

    let table = document.getElementById("inquiryTable");

    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let name = rows[i].cells[0].innerHTML.toLowerCase();

        if (name.includes(input)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}
async function exportInquiryCSV() {

    try {

        const response = await fetch("http://localhost:3000/api/inquiries");

        const data = await response.json();

        if (!data.success) {
            alert("❌ Could not load inquiries.");
            return;
        }

        if (data.inquiries.length === 0) {
            alert("📊 No inquiries available.");
            return;
        }

        let csv = "Name,Phone,Property,Message,Date & Time\n";

        data.inquiries.forEach(function(item) {

            csv +=
                '"' + item.name + '",' +
                '"' + item.phone + '",' +
                '"' + item.property + '",' +
                '"' + item.message + '",' +
                '"' + item.created_at + '"\n';

        });

        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "Dream-Homes-Inquiries.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        alert("✅ CSV downloaded successfully.");

    } catch (error) {

        console.error("CSV export error:", error);

        alert("❌ CSV export failed: " + error.message);

    }

}
function filterInquiry() {

    let property = document.getElementById("propertyFilter").value;

    let table = document.getElementById("inquiryTable");

    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let propertyName = rows[i].cells[2].innerHTML.trim().toLowerCase();

        if (property === "" || propertyName === property.toLowerCase()) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}
function sortInquiry() {

    let table = document.getElementById("inquiryTable");

    let rows = Array.from(table.rows).slice(1);

    let order = document.getElementById("sortInquiry").value;

    rows.sort(function(a, b) {

        let nameA = a.cells[0].innerHTML.toLowerCase();
        let nameB = b.cells[0].innerHTML.toLowerCase();

        if (order === "az") {
            return nameA.localeCompare(nameB);
        }

        if (order === "za") {
            return nameB.localeCompare(nameA);
        }

        return 0;

    });

    rows.forEach(function(row) {
        table.appendChild(row);
    });

}
function printInquiryReport() {

    window.print();

}
let currentPage = 1;
let rowsPerPage = 5;
function showPage() {

    let table = document.getElementById("inquiryTable");

    if (!table) return;

    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        if (
            i > (currentPage - 1) * rowsPerPage &&
            i <= currentPage * rowsPerPage
        ) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }

    document.getElementById("pageNumber").innerHTML = currentPage;

}
function nextPage() {

    currentPage++;

    showPage();

}

function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        showPage();

    }

}
// ===============================
// INQUIRY ANALYTICS
// ===============================

async function loadInquiryChart(filteredInquiries = null) {

    const canvas =
        document.getElementById("inquiryChart");

    if (!canvas) {
        return;
    }

    try {

        let inquiries = filteredInquiries;

        if (inquiries === null) {

            const response =
                await fetch(
                    "http://localhost:3000/api/inquiries"
                );

            const data =
                await response.json();

            if (!data.success) {
                return;
            }

            inquiries = data.inquiries || [];
        }


        // Count inquiries by property

        const propertyCounts = {};

        inquiries.forEach(function(inquiry) {

            const property =
                inquiry.property || "Unknown Property";

            if (!propertyCounts[property]) {
                propertyCounts[property] = 0;
            }

            propertyCounts[property]++;

        });


        const labels =
            Object.keys(propertyCounts);

        const values =
            Object.values(propertyCounts);


        // Remove old chart

        if (window.inquiryPropertyChart) {
            window.inquiryPropertyChart.destroy();
        }


        // Create new chart

        window.inquiryPropertyChart =
            new Chart(canvas, {

                type: "bar",

                data: {

                    labels: labels,

                    datasets: [{

                        label: "Customer Inquiries",

                        data: values

                    }]

                },

                options: {

                    responsive: true,

                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {
                                precision: 0
                            }

                        }

                    }

                }

            });

    } catch (error) {

        console.error(
            "❌ Inquiry property chart error:",
            error
        );

    }

}
async function loadInquiryDateChart(filteredInquiries = null) {

    const canvas =
        document.getElementById("inquiryDateChart");

    if (!canvas) {
        return;
    }

    try {

        let inquiries = filteredInquiries;

        if (inquiries === null) {

            const response =
                await fetch(
                    "http://localhost:3000/api/inquiries"
                );

            const data =
                await response.json();

            if (!data.success) {
                return;
            }

            inquiries = data.inquiries || [];
        }


        // ===============================
        // COUNT INQUIRIES BY DATE
        // ===============================

        const dateCounts = {};

        inquiries.forEach(function(inquiry) {

            if (!inquiry.created_at) {
                return;
            }

            const date =
                inquiry.created_at.split(" ")[0];

            if (!dateCounts[date]) {
                dateCounts[date] = 0;
            }

            dateCounts[date]++;

        });


        const labels =
            Object.keys(dateCounts).sort();

        const values =
            labels.map(function(date) {

                return dateCounts[date];

            });


        // ===============================
        // REMOVE OLD CHART
        // ===============================

if (
    window.inquiryDateChart &&
    typeof window.inquiryDateChart.destroy === "function"
) {

    window.inquiryDateChart.destroy();

}

window.inquiryDateChart = null;


        // ===============================
        // CREATE NEW CHART
        // ===============================

        window.inquiryDateChart =
            new Chart(canvas, {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [{

                        label:
                            "Customer Inquiries",

                        data: values,

                        fill: false,

                        tension: 0.3

                    }]

                },

                options: {

                    responsive: true,

                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                precision: 0

                            }

                        }

                    }

                }

            });

    } catch (error) {

        console.error(
            "❌ Inquiry date chart error:",
            error
        );

    }

}
async function loadInquiryAnalyticsSummary() {

    try {

        const response =
            await fetch("http://localhost:3000/api/inquiries");

        const data =
            await response.json();

        if (!data.success) {
            console.error("❌ Could not load inquiry summary.");
            return;
        }

        const inquiries = data.inquiries || [];

        // ===============================
        // TOTAL INQUIRIES
        // ===============================

        const totalElement =
            document.getElementById("analyticsTotalInquiries");

        if (totalElement) {
            totalElement.innerText =
                inquiries.length;
        }


        // ===============================
        // TODAY'S INQUIRIES
        // ===============================

        const today =
            new Date().toISOString().split("T")[0];

        let todayCount = 0;

        inquiries.forEach(function(inquiry) {

            if (!inquiry.created_at) {
                return;
            }

            const inquiryDate =
                inquiry.created_at.split(" ")[0];

            if (inquiryDate === today) {
                todayCount++;
            }

        });

        const todayElement =
            document.getElementById(
                "analyticsTodayInquiries"
            );

        if (todayElement) {
            todayElement.innerText =
                todayCount;
        }


        // ===============================
        // TOP PROPERTY
        // ===============================

        const propertyCounts = {};

        inquiries.forEach(function(inquiry) {

            const property =
                inquiry.property || "Unknown Property";

            if (!propertyCounts[property]) {
                propertyCounts[property] = 0;
            }

            propertyCounts[property]++;

        });


        let topProperty = "No Data";
        let highestCount = 0;

        Object.keys(propertyCounts).forEach(
            function(property) {

                if (
                    propertyCounts[property] >
                    highestCount
                ) {

                    highestCount =
                        propertyCounts[property];

                    topProperty =
                        property;
                }

            }
        );


        const topPropertyElement =
            document.getElementById(
                "analyticsTopProperty"
            );

        if (topPropertyElement) {

            topPropertyElement.innerText =
                topProperty;

        }

    } catch (error) {

        console.error(
            "❌ Inquiry summary error:",
            error
        );

    }

}
async function applyInquiryDateFilter() {

    const fromDate =
        document.getElementById("inquiryFromDate").value;

    const toDate =
        document.getElementById("inquiryToDate").value;

    if (fromDate === "" || toDate === "") {

        alert("📅 Please select both dates.");

        return;
    }

    if (fromDate > toDate) {

        alert("❌ From Date cannot be after To Date.");

        return;
    }

    try {

        const response =
            await fetch("http://localhost:3000/api/inquiries");

        const data =
            await response.json();

        if (!data.success) {

            alert("❌ Could not load inquiries.");

            return;
        }

        const filteredInquiries =
            data.inquiries.filter(function(inquiry) {

                if (!inquiry.created_at) {
                    return false;
                }

                const inquiryDate =
                    inquiry.created_at.split(" ")[0];

                return (
                    inquiryDate >= fromDate &&
                    inquiryDate <= toDate
                );

            });


        // ===============================
        // UPDATE TOTAL
        // ===============================

        const totalElement =
            document.getElementById(
                "analyticsTotalInquiries"
            );

        if (totalElement) {

            totalElement.innerText =
                filteredInquiries.length;

        }


        // ===============================
        // UPDATE TOP PROPERTY
        // ===============================

        const propertyCounts = {};

        filteredInquiries.forEach(
            function(inquiry) {

                const property =
                    inquiry.property ||
                    "Unknown Property";

                if (!propertyCounts[property]) {

                    propertyCounts[property] = 0;

                }

                propertyCounts[property]++;

            }
        );


        let topProperty = "No Data";
        let highestCount = 0;

        Object.keys(propertyCounts).forEach(
            function(property) {

                if (
                    propertyCounts[property] >
                    highestCount
                ) {

                    highestCount =
                        propertyCounts[property];

                    topProperty =
                        property;

                }

            }
        );


        const topPropertyElement =
            document.getElementById(
                "analyticsTopProperty"
            );

        if (topPropertyElement) {

            topPropertyElement.innerText =
                topProperty;

        }


        // ===============================
        // UPDATE TODAY'S COUNT
        // ===============================

        const today =
            new Date().toISOString().split("T")[0];

        const todayCount =
            filteredInquiries.filter(
                function(inquiry) {

                    if (!inquiry.created_at) {
                        return false;
                    }

                    return (
                        inquiry.created_at
                            .split(" ")[0] === today
                    );

                }
            ).length;


        const todayElement =
            document.getElementById(
                "analyticsTodayInquiries"
            );

        if (todayElement) {

            todayElement.innerText =
                todayCount;

        }

loadInquiryChart(filteredInquiries);

loadInquiryDateChart(filteredInquiries);
        // ===============================
        // SHOW MESSAGE
        // ===============================

        alert(
            "✅ Filter applied! " +
            filteredInquiries.length +
            " inquiries found."
        );

    } catch (error) {

        console.error(
            "❌ Inquiry date filter error:",
            error
        );

        alert(
            "❌ Could not connect to the backend."
        );

    }

}
function clearInquiryDateFilter() {

    document.getElementById("inquiryFromDate").value = "";

    document.getElementById("inquiryToDate").value = "";

    loadInquiryAnalyticsSummary();

    alert("🔄 Inquiry date filter cleared.");

}
function filterByDate() {

    let selectedDate = document.getElementById("dateFilter").value;

    let table = document.getElementById("inquiryTable");

    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let dateCell = rows[i].cells[4].innerHTML;

        if (selectedDate === "") {

            rows[i].style.display = "";

            continue;
        }

        let parts = dateCell.split(",");

        let datePart = parts[0].trim();

        let dateValues = datePart.split("/");

        if (dateValues.length === 3) {

            let day = dateValues[0].padStart(2, "0");
            let month = dateValues[1].padStart(2, "0");
            let year = dateValues[2];

            let inquiryDate = year + "-" + month + "-" + day;

            if (inquiryDate === selectedDate) {

                rows[i].style.display = "";

            } else {

                rows[i].style.display = "none";

            }

        } else {

            rows[i].style.display = "none";

        }

    }

}
function emailCustomer(name){

    alert("📧 Email feature for " + name + " will be connected to a real email service later.");

}
function callCustomer(phone){

    window.location.href = "tel:" + phone;

}

function notifyAdmin(message){

    alert("🔔 " + message);

}
function markImportant(button){

    button.style.backgroundColor = "gold";
    button.style.color = "black";
    button.innerHTML = "⭐ Important";

}
function checkAdmin(){

    let admin =
        localStorage.getItem("adminLogin") ||
        sessionStorage.getItem("adminLogin");

    if(admin !== "true"){

        alert("🔒 Please login as Admin.");

        window.location.href = "login.html";

    }

}

async function loginAdmin() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const rememberBox = document.getElementById("rememberMe");

    if (!rememberBox) {
        alert("❌ Remember Me checkbox not found.");
        return;
    }

    const remember = rememberBox.checked;

    if (email === "" || password === "") {
        alert("❌ Please enter Email and Password.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        console.log("Login HTTP status:", response.status);

        const data = await response.json();

        console.log("Login response:", data);

        if (!data.success) {
            alert("❌ " + data.message);
            return;
        }

if (remember) {

    localStorage.setItem("adminLogin", "true");

} else {

    sessionStorage.setItem("adminLogin", "true");

}

// Save the actual logged-in user
localStorage.setItem(
    "loggedInUser",
JSON.stringify(data.user)
);

        localStorage.setItem(
            "lastLogin",
            new Date().toLocaleString()
        );

        alert("✅ Login Successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error("❌ Login error:", error);

        alert(
            "❌ Login failed. Check that the backend server is running."
        );

    }
}

function saveProfile(){

    alert("saveProfile started");

    let name = document.getElementById("profileName").value;

    let email = document.getElementById("profileEmail").value;

    if(name === "" || email === ""){

        alert("Please fill all fields.");

        return;

    }

    localStorage.setItem("profileName", name);

    localStorage.setItem("profileEmail", email);

    alert("✅ Profile saved successfully!");

}
function logoutAdmin(){

    localStorage.removeItem("adminLogin");

    sessionStorage.removeItem("adminLogin");

    alert("✅ Logged out successfully!");

    window.location.href = "login.html";

}
function changePassword(){

    let oldPassword =
    document.getElementById("oldPassword").value;

    let newPassword =
    document.getElementById("newPassword").value;

    if(oldPassword === "" || newPassword === ""){

        alert("Please fill all fields.");

        return;

    }

    localStorage.setItem("adminPassword", newPassword);

    alert("✅ Password changed successfully!");

    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";

}
async function bookVisit() {

    let name = document.getElementById("visitorName").value;
    let email = document.getElementById("visitorEmail").value;
    let phone = document.getElementById("visitorPhone").value;
    let property = document.getElementById("visitProperty").value;
    let date = document.getElementById("visitDate").value;
    let time = document.getElementById("visitTime").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        property === "" ||
        date === "" ||
        time === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/bookings", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                property: property,
                date: date,
                time: time
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("✅ Property Visit Booked Successfully!");

            document.getElementById("visitorName").value = "";
            document.getElementById("visitorEmail").value = "";
            document.getElementById("visitorPhone").value = "";
            document.getElementById("visitProperty").value = "";
            document.getElementById("visitDate").value = "";
            document.getElementById("visitTime").value = "";

        } else {

            alert("❌ " + data.message);

        }

    } catch (error) {

        console.error("Booking error:", error);

        alert("❌ Could not connect to the backend.");

    }

}
async function loadBookings() {

    const table = document.getElementById("bookingTable");

    if (!table) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/bookings"
        );

        const data = await response.json();

        console.log("DATABASE BOOKINGS:", data);

        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Property</th>
                <th>Date</th>
                <th>Time</th>
            </tr>
        `;

        if (
            !data.bookings ||
            data.bookings.length === 0
        ) {

            const row = table.insertRow();

            const cell = row.insertCell(0);

            cell.colSpan = 6;

            cell.innerHTML =
                "📅 No property visit bookings yet.";

            cell.style.textAlign = "center";

        } else {

            data.bookings.forEach(function(item) {

                const row = table.insertRow();

                row.insertCell(0).innerText = item.name;

                row.insertCell(1).innerText = item.email;

                row.insertCell(2).innerText = item.phone;

                row.insertCell(3).innerText = item.property;

                row.insertCell(4).innerText = item.date;

                row.insertCell(5).innerText = item.time;

            });

        }

        const bookingCard =
            document.getElementById("bookingCard");

        if (bookingCard) {

            bookingCard.innerText =
                data.bookings.length;

        }

    } catch (error) {

        console.error(
            "❌ Booking database error:",
            error
        );

    }

}
window.addEventListener("load", function() {
    loadBookings();
});
async function updateBookingCount() {

    try {

        const response =
            await fetch("http://localhost:3000/api/bookings");

        const data =
            await response.json();

        const bookingCard =
            document.getElementById("bookingCard");

        if (bookingCard) {

            bookingCard.innerText =
                data.bookings.length;

        }

    } catch (error) {

        console.error(
            "❌ Booking count error:",
            error
        );

    }

}
window.addEventListener("load", function() {

    updateBookingCount();

});
async function clearBookings() {

    const confirmClear = confirm(
        "⚠️ Are you sure you want to delete ALL property visit bookings? This cannot be undone."
    );

    if (!confirmClear) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/bookings",
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("✅ All bookings cleared.");

            location.reload();

        } else {

            alert("❌ Could not clear bookings.");

        }

    } catch (error) {

        console.error(
            "❌ Clear bookings error:",
            error
        );

        alert(
            "❌ Could not connect to the database."
        );

    }

}
function loadLastLogin() {

    let lastLogin = localStorage.getItem("lastLogin");

    let lastLoginElement =
        document.getElementById("lastLogin");

    if (lastLoginElement && lastLogin) {

        lastLoginElement.innerHTML = lastLogin;

    }

}
window.addEventListener("load", function() {

    loadLastLogin();

});
async function updateTodayBookingCount() {

    try {

        const response =
            await fetch("http://localhost:3000/api/bookings");

        const data =
            await response.json();

        const today =
            new Date().toISOString().split("T")[0];

        const todayBookings =
            data.bookings.filter(function(item) {

                return item.date === today;

            });

        const todayBookingCard =
            document.getElementById("todayBookingCard");

        if (todayBookingCard) {

            todayBookingCard.innerText =
                todayBookings.length;

        }

    } catch (error) {

        console.error(
            "❌ Today's booking count error:",
            error
        );

    }

}
window.addEventListener("load", function() {

    updateTodayBookingCount();

});
async function updateTodayInquiryCount() {

    try {

        const response =
            await fetch("http://localhost:3000/api/inquiries");

        const data =
            await response.json();

        const today =
            new Date().toISOString().split("T")[0];

        const todayInquiries =
            data.inquiries.filter(function(item) {

                if (!item.created_at) {
                    return false;
                }

                const inquiryDate =
                    item.created_at.split(" ")[0];

                return inquiryDate === today;

            });

        const todayInquiryCard =
            document.getElementById("todayInquiryCard");

        if (todayInquiryCard) {

            todayInquiryCard.innerText =
                todayInquiries.length;

        }

    } catch (error) {

        console.error(
            "❌ Today's inquiry count error:",
            error
        );

    }

}
window.addEventListener("load", function() {

    updateTodayInquiryCount();

});
function updatePropertyCount() {

    setTimeout(function() {

        const propertyCount =
            document.getElementById("propertyCount");

        const propertyCards =
            document.querySelectorAll(".admin-property-card");

        if (propertyCount) {

            propertyCount.innerHTML =
                propertyCards.length;

            console.log(
                "🏡 PROPERTY COUNT:",
                propertyCards.length
            );

        }

    }, 500);

}

window.addEventListener("load", function() {

    updatePropertyCount();

});
function updateDashboardTime() {

    let updated =
        document.getElementById("dashboardUpdated");

    if (updated) {

        updated.innerHTML =
            new Date().toLocaleString();

    }

}

window.addEventListener("load", function() {

    updateDashboardTime();

});
async function loadBackendInquiries() {

    try {

        const response = await fetch("http://localhost:3000/api/inquiries");

        const data = await response.json();

        console.log("Backend inquiries:", data);

    } catch (error) {

        console.error("Backend connection error:", error);

    }

}
console.log("✅ Dream Homes script.js loaded");
// Load inquiries from backend database
async function loadDashboardInquiries() {

    try {

        const response = await fetch("http://localhost:3000/api/inquiries");

        const data = await response.json();

        console.log("DATABASE DATA:", data);

        const table = document.getElementById("inquiryTable");

        if (!table) {
            console.log("❌ inquiryTable not found");
            return;
        }

        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Property</th>
                <th>Message</th>
                <th>Date & Time</th>
                <th>Action</th>
            </tr>
        `;

        data.inquiries.forEach(function(inquiry) {

            const row = table.insertRow();

            row.insertCell(0).innerText = inquiry.name;

            row.insertCell(1).innerText = inquiry.phone;

            row.insertCell(2).innerText = inquiry.property;

            row.insertCell(3).innerText = inquiry.message;

            row.insertCell(4).innerText = inquiry.created_at;

            row.insertCell(5).innerHTML = `
<button onclick="editInquiry(${inquiry.id})">
    ✏️ Edit
</button>

<button onclick="deleteInquiry(${inquiry.id})">
    🗑 Delete
</button>

<button onclick="emailCustomer('${inquiry.name}')">
    📧 Email
</button>

<button onclick="callCustomer('${inquiry.phone}')">
    📞 Call
</button>
            `;

        });

        const count = document.getElementById("inquiryCount");

        if (count) {
            count.innerText = data.inquiries.length;
        }

        const card = document.getElementById("cardInquiryCount");

        if (card) {
            card.innerText = data.inquiries.length;
        }

    } catch (error) {

        console.error("❌ Dashboard database error:", error);

    }

}
function updateWishlistCount() {

    const wishlistCard =
        document.getElementById("wishlistCard");

    if (!wishlistCard) {
        return;
    }

    const wishlist =
        Number(localStorage.getItem("wishlist")) || 0;

    wishlistCard.innerText = wishlist;

}

window.addEventListener("load", function() {

    updateWishlistCount();

});
// ===============================
// Dashboard Wishlist Count
// ===============================

function updateDashboardWishlist() {

    let wishlistCount =
        Number(localStorage.getItem("wishlist")) || 0;

    let wishlistCard =
        document.getElementById("wishlistCard");

    if (wishlistCard) {

        wishlistCard.innerText = wishlist;

    }

}

window.addEventListener("load", function() {

    updateDashboardWishlist();

});


function updateDashboardWishlist() {

    let wishlist = Number(localStorage.getItem("wishlist")) || 0;

    let wishlistCard = document.getElementById("wishlistCard");

    if (wishlistCard) {
        wishlistCard.innerHTML = wishlist;
    }
}

window.addEventListener("load", function () {
    updateDashboardWishlist();
});

async function confirmDeleteProperty(propertyId, propertyName) {

    let confirmDelete = confirm(
        "⚠️ Are you sure you want to delete " + propertyName + "?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/properties/" + propertyId,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        console.log("Delete response:", data);

        if (!data.success) {

            alert("❌ " + data.message);
            return;

        }

        alert("✅ Property deleted successfully!");

        loadProperties();

    } catch (error) {

        console.error("Delete error:", error);

        alert("❌ Could not connect to backend.");

    }

}

// ===============================
// EDIT PROPERTY
// ===============================

let editingPropertyName = "";

function editProperty(name, price, location, bedrooms) {

    let form = document.getElementById("editPropertyForm");

    if (!form) {
        alert("❌ Edit property form not found.");
        return;
    }

    // Remember which property we are editing
    editingPropertyName = name;

    // Show edit form
    form.style.display = "block";

    // Put property information into the form
    document.getElementById("editPropertyName").value = name;
    document.getElementById("editPropertyPrice").value = price;
    document.getElementById("editPropertyLocation").value = location;
    document.getElementById("editPropertyBedrooms").value = bedrooms;

    // Scroll to edit form
    form.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
async function saveEditedProperty() {

    let oldName = document.getElementById("editPropertyName").value;
    let title = document.getElementById("editPropertyTitle").value;
    let price = document.getElementById("editPropertyPrice").value;
    let location = document.getElementById("editPropertyLocation").value;
    let bedrooms = document.getElementById("editPropertyBedrooms").value;

    if (
        title === "" ||
        price === "" ||
        location === "" ||
        bedrooms === ""
    ) {
        alert("❌ Please fill all fields.");
        return;
    }

    console.log("Saving property:", oldName);

    try {

        const response = await fetch(
            "http://localhost:3000/api/properties",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oldName: oldName,
                    name: title,
                    price: Number(price),
                    location: location,
                    bedrooms: Number(bedrooms)
                })
            }
        );

        const data = await response.json();

        console.log("Update response:", data);

        if (!data.success) {
            alert("❌ " + data.message);
            return;
        }

        alert("✅ Property updated successfully!");

        closeEditProperty();

        loadProperties();

    } catch (error) {

        console.error("Update error:", error);

        alert("❌ Could not connect to backend.");

    }
}

function closeEditProperty() {

    let form = document.getElementById("editPropertyForm");

    if (form) {

        form.style.display = "none";

    }

    document.getElementById("editPropertyName").value = "";
    document.getElementById("editPropertyTitle").value = "";
    document.getElementById("editPropertyPrice").value = "";
    document.getElementById("editPropertyLocation").value = "";
    document.getElementById("editPropertyBedrooms").value = "";

}
async function loadProperties() {

    const response = await fetch("http://localhost:3000/api/properties");

    const data = await response.json();

let container = document.getElementById("propertyManagement");

if (!container) {
    return;
}

container.innerHTML = "";
data.properties.forEach(function(property) {

    container.innerHTML += `
        <div class="admin-property-card" id="propertyCard${property.id}">

            <img src="images/${property.image}" width="150">

            <h3>${property.name}</h3>

            <p>📍 ${property.location}</p>

            <p>💰 ₹${Number(property.price).toLocaleString("en-IN")}</p>

            <p>🛏 ${property.bedrooms} Bedrooms</p>

            <button onclick="editProperty('${property.name}','${property.price}','${property.location}','${property.bedrooms}')">
                ✏️ Edit
            </button>

<button onclick="confirmDeleteProperty(${property.id}, '${property.name}')">
    🗑️ Delete
</button>

        </div>
    `;

});
}
loadProperties();
// ===============================
// ADD NEW PROPERTY
// ===============================

async function addNewProperty() {

    const name =
        document.getElementById("newPropertyName").value.trim();

    const price =
        document.getElementById("newPropertyPrice").value.trim();

    const location =
        document.getElementById("newPropertyLocation").value.trim();

    const bedrooms =
        document.getElementById("newPropertyBedrooms").value.trim();
        const image =
    document.getElementById("newPropertyImage").value.trim();


    // Check fields
if (
    name === "" ||
    price === "" ||
    location === "" ||
    bedrooms === "" ||
    image === ""
) {

        alert("❌ Please fill all property fields.");
        return;

    }


    try {

        const response = await fetch(
            "http://localhost:3000/api/properties",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    price: Number(price),
                    location: location,
                    bedrooms: Number(bedrooms),
image: image

                })
            }
        );


        const data = await response.json();

        console.log("Add property response:", data);


        if (!data.success) {

            alert("❌ " + data.message);
            return;

        }


        alert("✅ Property added successfully!");


        // Clear form

        document.getElementById("newPropertyName").value = "";

        document.getElementById("newPropertyPrice").value = "";

        document.getElementById("newPropertyLocation").value = "";

        document.getElementById("newPropertyBedrooms").value = "";
        document.getElementById("newPropertyImage").value = "";


        // Reload properties

        loadProperties();


    } catch (error) {

        console.error("Add property error:", error);

        alert("❌ Could not connect to backend.");

    }

}

async function loadPublicProperties() {

    const container =
        document.getElementById("publicPropertyContainer");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch("http://localhost:3000/api/properties");

        const data = await response.json();

        if (!data.success) {
            console.error("Could not load public properties.");
            return;
        }

        container.innerHTML = "";

        data.properties.forEach(function(property) {

            let propertyId = property.id;

            container.innerHTML += `

                <div class="property-card"
                     data-location="${property.location.toLowerCase()}"
                     data-price="${property.price}"
                     data-bedrooms="${property.bedrooms}">

                    <span class="status-badge sale">
                        For Sale
                    </span>

                    <img
                        src="images/${property.image}"
                        alt="${property.name}">

                    <h3>${property.name}</h3>

                    <p>
                        📍 ${property.location}
                    </p>

                    <p>
                        ₹${Number(property.price).toLocaleString("en-IN")}
                    </p>

                    <p>
                        🛏 ${property.bedrooms} Bedrooms
                    </p>

<a href="property-details.html?id=${property.id}">
    <button>
        View Details
    </button>
</a>

                    <button
                        onclick="addToCompare(
                            '${property.name}',
                            '${property.price}',
                            '${property.location}',
                            '${property.bedrooms}',
                            this
                        )">
                        Compare
                    </button>

                    <h4>💬 Customer Reviews</h4>

                    <div id="reviews${propertyId}"></div>

                    <input
                        type="text"
                        id="reviewInput${propertyId}"
                        placeholder="Write your review">

                    <button
                        onclick="addReview(
                            'reviewInput${propertyId}',
                            'reviews${propertyId}'
                        )">
                        Submit Review
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(
            "Public property loading error:",
            error
        );

    }

}

loadPublicProperties();
// ===============================
// USER REGISTRATION
// ===============================

async function registerUser() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const phone =
        document.getElementById("registerPhone").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("❌ Please fill all fields.");
        return;

    }


    if (password !== confirmPassword) {

        alert("❌ Passwords do not match.");
        return;

    }


    try {

        const response = await fetch(
            "http://localhost:3000/api/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!data.success) {

            alert("❌ " + data.message);
            return;

        }


        alert("✅ Account created successfully!");


        window.location.href = "login.html";


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        alert(
            "❌ Could not connect to Dream Homes server."
        );

    }

}

function downloadInquiryPDF() {

    const { jsPDF } = window.jspdf;

    const table = document.getElementById("inquiryTable");

    if (!table) {
        alert("❌ Inquiry table not found.");
        return;
    }

    // Create PDF report container
    const report = document.createElement("div");

    report.style.position = "fixed";
    report.style.left = "-10000px";
    report.style.top = "0";
    report.style.width = "900px";
    report.style.background = "white";
    report.style.color = "black";
    report.style.padding = "40px";
    report.style.fontFamily = "Arial";

    // Copy the table
    const pdfTable = table.cloneNode(true);

    // Remove Action column
    const rows = pdfTable.querySelectorAll("tr");

    rows.forEach(function(row) {

        if (row.cells.length > 5) {
            row.deleteCell(5);
        }

    });

    // Style PDF table
    pdfTable.style.width = "100%";
    pdfTable.style.borderCollapse = "collapse";
    pdfTable.style.marginTop = "25px";

    const cells = pdfTable.querySelectorAll("th, td");

    cells.forEach(function(cell) {

        cell.style.border = "1px solid #333";
        cell.style.padding = "10px";
        cell.style.color = "black";
        cell.style.background = "white";
        cell.style.fontSize = "14px";

    });

    // Style header row
    const headers = pdfTable.querySelectorAll("th");

    headers.forEach(function(header) {

        header.style.background = "#eeeeee";
        header.style.fontWeight = "bold";
        header.style.textAlign = "center";

    });

    // Count inquiries
    const inquiryRows = table.querySelectorAll("tr").length - 1;

    // Current date
    const generatedDate = new Date().toLocaleString();

    // Build PDF content
    report.innerHTML = `

        <div style="text-align:center;">

            <h1 style="
                margin:0;
                font-size:32px;
                color:black;
            ">
                🏠 Dream Homes
            </h1>

            <h2 style="
                margin-top:10px;
                margin-bottom:5px;
                color:black;
            ">
                Customer Inquiry Report
            </h2>

            <p style="
                margin-top:5px;
                color:#333;
            ">
                Generated: ${generatedDate}
            </p>

        </div>

        <hr style="border:1px solid #333;">

        <div style="
            margin-top:20px;
            margin-bottom:20px;
            font-size:16px;
            color:black;
        ">
            <strong>Total Inquiries:</strong>
            ${inquiryRows}
        </div>

    `;

    // Add the styled table
    report.appendChild(pdfTable);

    document.body.appendChild(report);

    console.log("✅ PDF REPORT CREATED");

    // Capture report
    html2canvas(report, {

        scale: 2,

        backgroundColor: "#ffffff",

        useCORS: true

    })
    .then(function(canvas) {

        console.log(
            "✅ PDF CANVAS:",
            canvas.width,
            canvas.height
        );

        const imageData =
            canvas.toDataURL("image/jpeg", 1.0);

        const pdf = new jsPDF({

            orientation: "landscape",

            unit: "mm",

            format: "a4"

        });

        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const pageHeight =
            pdf.internal.pageSize.getHeight();

        const margin = 10;

        const imageWidth =
            pageWidth - (margin * 2);

        const imageHeight =
            canvas.height * imageWidth / canvas.width;

        let heightLeft = imageHeight;

        let position = margin;

        // First page
        pdf.addImage(

            imageData,

            "JPEG",

            margin,

            position,

            imageWidth,

            imageHeight

        );

        heightLeft -=
            pageHeight - (margin * 2);

        // Additional pages
        while (heightLeft > 0) {

            position =
                heightLeft - imageHeight + margin;

            pdf.addPage();

            pdf.addImage(

                imageData,

                "JPEG",

                margin,

                position,

                imageWidth,

                imageHeight

            );

            heightLeft -=
                pageHeight - (margin * 2);

        }

        // Download
        pdf.save(
            "Dream-Homes-Inquiry-Report.pdf"
        );

        // Remove temporary report
        report.remove();

        alert(
            "✅ Professional PDF downloaded successfully!"
        );

    })
    .catch(function(error) {

        console.error(
            "❌ PDF ERROR:",
            error
        );

        if (report.parentNode) {

            report.parentNode.removeChild(report);

        }

        alert(
            "❌ PDF generation failed."
        );

    });

}
function contactAgent(agentName) {

    localStorage.setItem("selectedAgent", agentName);

    if (agentName === "John David") {
        window.location.href = "agent1.html";
    }

    else if (agentName === "Sarah Williams") {
        window.location.href = "agent2.html";
    }

    else if (agentName === "Michael Brown") {
        window.location.href = "agent3.html";
    }

}
async function scheduleVisit() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || phone === "" || message === "") {

        alert("Please fill all fields.");

        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/inquiries",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    property: localStorage.getItem("selectedAgent") || "Agent Contact",
                    message: message
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("✅ Your request has been sent successfully!");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("message").value = "";

        } else {

            alert("❌ Could not save your request.");

        }

    } catch (error) {

        console.error("Schedule visit error:", error);

        alert(
            "❌ Cannot connect to the backend. Make sure your Node server is running."
        );

    }

}
function bookConsultation() {

    alert("Thank you! Our property expert will contact you soon.");

    window.location.href = "agent1.html";

}
async function forgotPassword() {

    const email = document.getElementById("forgotEmail").value.trim();

    if (email === "") {
        alert("❌ Please enter your registered email.");
        return;
    }

    const newPassword = prompt("Enter your new password:");

    if (!newPassword) {
        alert("❌ Password cannot be empty.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/forgot-password",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    newPassword: newPassword
                })
            }
        );

        const data = await response.json();

        console.log("Forgot password response:", data);

        if (data.success) {

            alert("✅ Password changed successfully!");

            window.location.href = "login.html";

        } else {

            alert("❌ " + data.message);

        }

    } catch (error) {

        console.error("Forgot password error:", error);

        alert("❌ Could not connect to the backend.");

    }
}
window.addEventListener("load", function () {

    const companyName = document.getElementById("companyName");

    if (companyName) {
        companyName.innerText = SITE_CONFIG.companyName;
    }

    const companyTagline = document.getElementById("companyTagline");

    if (companyTagline) {
        companyTagline.innerText = SITE_CONFIG.tagline;
    }

    const companyAddress = document.getElementById("companyAddress");

    if (companyAddress) {
        companyAddress.innerText = "📍 " + SITE_CONFIG.address;
    }

    const companyPhone = document.getElementById("companyPhone");

    if (companyPhone) {
        companyPhone.innerText = "📞 " + SITE_CONFIG.phone;
    }

    const companyEmail = document.getElementById("companyEmail");

    if (companyEmail) {
        companyEmail.innerText = "✉️ " + SITE_CONFIG.email;
    }

    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.innerText = SITE_CONFIG.copyrightYear;
    }

    const copyrightCompany = document.getElementById("copyrightCompany");

    if (copyrightCompany) {
        copyrightCompany.innerText = SITE_CONFIG.companyName;
    }

});
// ===============================
// Customer Review
// ===============================

function addReview(inputId, reviewsId) {

    const input = document.getElementById(inputId);
    const reviews = document.getElementById(reviewsId);

    if (!input || !reviews) {
        console.error("Review elements not found.");
        return;
    }

    const reviewText = input.value.trim();

    if (reviewText === "") {
        alert("Please write a review.");
        return;
    }

    const review = document.createElement("p");

    review.innerHTML = "💬 " + reviewText;

    reviews.appendChild(review);

    input.value = "";

    alert("✅ Review submitted successfully!");
}