async function loadDashboardInquiries() {
    console.log("STEP 191.33 WORKING");

    try {

        const response = await fetch("http://localhost:3000/api/inquiries");

        const data = await response.json();

        console.log("Database inquiries:", data);

        if (!data.success) {
            return;
        }

        const table = document.getElementById("inquiryTable");

        if (!table) {
            console.log("Inquiry table not found.");
            return;
        }

        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Property</th>
                <th>Message</th>
                <th>Date & Time</th>
            </tr>
        `;

        data.inquiries.forEach(function(inquiry) {

            const row = table.insertRow();

            row.insertCell(0).innerText = inquiry.name;
            row.insertCell(1).innerText = inquiry.phone;
            row.insertCell(2).innerText = inquiry.property;
            row.insertCell(3).innerText = inquiry.message;
            row.insertCell(4).innerText = inquiry.created_at;

        });

    } catch (error) {

        console.error("Backend connection error:", error);

    }

}