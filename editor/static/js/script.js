function downloadPNG() {
    document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'none');

    const invitation = document.querySelector("#invitation");

    // Add padding around card temporarily
    invitation.style.padding = "40px";

    html2canvas(invitation, {
        backgroundColor: null,
        scale: 3,  
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0
    }).then(function (canvas) {
        const link = document.createElement('a');
        link.download = 'invitation.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();

        // Restore styles
        invitation.style.padding = "";
        document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'block');
    });
}

function sharePNG() {
    const invitation = document.querySelector("#invitation");

    html2canvas(invitation, {
        backgroundColor: null,
        scale: 3,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(function(blob) {
            let formData = new FormData();
            formData.append("image", blob, "invitation.png");

            fetch("/upload_invitation/", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")  // CSRF for Django
                }
            })
            .then(res => res.json())
            .then(data => {
                if (navigator.share) {
                    navigator.share({
                        title: "Invitation",
                        text: "Check out my invitation!",
                        url: data.url   // returned from backend
                    });
                } else {
                    alert("Share this link: " + data.url);
                }
            });
        });
    });
}

// helper for CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
