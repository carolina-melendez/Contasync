import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/Components/header/header.component";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-boleta-pago-empleado',
    standalone: true,
    templateUrl: './boleta-pago-empleado.component.html',
    styleUrls: ['./boleta-pago-empleado.component.css'],
    imports: [HeaderComponent, CommonModule]
})
export class BoletaPagoEmpleadoComponent {
    generatePDF() {
        const elementToPrint = document.getElementById("view");
        const fileNameElement = document.getElementById("file-name");
        const fileName = fileNameElement ? fileNameElement.innerText.trim() : 'default';

        if (elementToPrint) {
            console.log("Element found, generating PDF...");

            html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
                const pdf = new jsPDF('l', 'mm', 'letter');
                const imgData = canvas.toDataURL('image/png');

                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                // Margen superior ajustado
                const marginTop = 20; 

                pdf.addImage(imgData, 'PNG', 0, marginTop, pdfWidth, pdfHeight);

                pdf.setProperties({
                    title: `Boleta de pago de ${fileName}`,
                    subject: "",
                    author: "Contasync"
                });

                pdf.setFontSize(12);
                pdf.text('', 14, marginTop + 22); // Ajusta la posición del texto adicional

                pdf.save(`${fileName}.pdf`);

                console.log("PDF generated successfully.");
            }).catch((error) => {
                console.error("Error generating PDF: ", error);
            });
        } else {
            console.error("Element with id 'view' not found.");
        }
    }
}
