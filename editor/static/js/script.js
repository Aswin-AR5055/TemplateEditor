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
