function downloadPNG() {
    // Hide buttons
    document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'none');
    
    // Get the invitation element
    const invitation = document.querySelector("#invitation");
    
    // Create options for html2canvas
    const options = {
        backgroundColor: null, // Make background transparent
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: invitation.offsetWidth,
        height: invitation.offsetHeight,
        windowWidth: invitation.scrollWidth,
        windowHeight: invitation.scrollHeight
    };

    html2canvas(invitation, options).then(function (canvas) {
        // Create a new canvas with exact dimensions
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = invitation.offsetWidth;
        finalCanvas.height = invitation.offsetHeight;
        const ctx = finalCanvas.getContext('2d');
        
        // Fill with white background (optional - remove if you want transparent)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        
        // Draw the captured content
        ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);
        
        // Create download link
        var link = document.createElement('a');
        link.download = 'invitation.png';
        link.href = finalCanvas.toDataURL('image/png', 1.0);
        link.click();

        // Show buttons again
        document.querySelectorAll('.hide-on-snapshot').forEach(el => el.style.display = 'block');
    });
}