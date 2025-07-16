function downloadPNG() {
    // Hide buttons
    document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'none');

    html2canvas(document.querySelector("#invitation"), {
        width: 1600,
        height: 750,
        scale: 1 // fixed scale for crisp dimensions
    }).then(function (canvas) {
        var link = document.createElement('a');
        link.download = 'invitation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Show buttons again
        document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'block');
    });
}