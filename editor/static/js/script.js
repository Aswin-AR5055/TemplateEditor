function downloadPNG() {
    document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'none');

    const invitation = document.querySelector("#invitation");

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
                    "X-CSRFToken": getCookie("csrftoken")
                }
            })
            .then(res => res.json())
            .then(data => {
                const longUrl = data.url;

                fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
                .then(res => res.text())
                .then(shortUrl => {
                    if (navigator.share) {
                        navigator.share({
                            title: "Invitation",
                            text: "Check out my invitation!",
                            url: shortUrl
                        });
                    } else {
                        alert("Share this link: " + shortUrl);
                    }
                })
                .catch(err => {
                    console.error("TinyURL error:", err);
                    alert("Could not shorten URL. Use: " + longUrl);
                });
            });
        });
    });
}


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
