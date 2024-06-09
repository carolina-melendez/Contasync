import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/Components/header/header.component';

@Component({
  selector: 'app-generar-planilla',
  standalone: true,
  templateUrl: './generar-planilla.component.html',
  styleUrls: ['./generar-planilla.component.css'],
  imports: [CommonModule, HeaderComponent],
})
export class GenerarPlanillaComponent {
  generatePDF() {
    const elementToPrint = document.getElementById('planilla');

    if (elementToPrint) {
      console.log('Element found, generating PDF...');

      // Crear el div del encabezado dinámicamente
      const headerDiv = document.createElement('div');
      headerDiv.innerHTML = `
               <div style="font-weight: bold">
          <h1>PLANILLA DE SUELDO DEL 01 DE ENERO AL 31 DE ENERO DEL 2024</h1>
        </div>
        <div>
          <h4>(Expresado en dólares de los Estados Unidos de América)</h4>
        </div>
            `;
      headerDiv.style.width = `${elementToPrint.clientWidth}px`;

      document.body.appendChild(headerDiv);

      html2canvas(headerDiv)
        .then((headerCanvas) => {
          const headerImgData = headerCanvas.toDataURL('image/png');
          document.body.removeChild(headerDiv); // Eliminar el div del encabezado del DOM

          html2canvas(elementToPrint)
            .then((canvas) => {
              const pdf = new jsPDF('l', 'in', 'legal'); // Cambia a tamaño legal

              const imgProps = pdf.getImageProperties(
                canvas.toDataURL('image/png')
              );
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
              const scaleFactor = pdfWidth / imgProps.width; // Factor de escala para ajustar al ancho de la página

              const marginTop = 0.5; // Margen superior en pulgadas
              const marginLeft = 0.7; // Margen izquierdo en pulgadas
              const marginRight = 0.7; // Margen derecho en pulgadas

              // Ajustar la posición del contenido de la imagen para no sobreponer el encabezado
              const adjustedMarginTop = marginTop + 1; // Ajustar según el tamaño del encabezado

              // Agregar la imagen del encabezado
              const headerHeight = 0.5; // Altura del encabezado en pulgadas
              pdf.addImage(
                headerImgData,
                'PNG',
                marginLeft,
                marginTop,
                pdfWidth - marginLeft - marginRight,
                headerHeight
              );

              // Agregar la imagen del contenido principal
              pdf.addImage(
                canvas.toDataURL('image/png'),
                'PNG',
                marginLeft,
                adjustedMarginTop,
                pdfWidth - marginLeft - marginRight,
                imgProps.height * scaleFactor
              );

              pdf.setProperties({
                title: `Planilla de pagos`,
                subject: '',
                author: 'Contasync',
              });

              pdf.save(`Planilla_de_pagos.pdf`);

              console.log('PDF generated successfully.');
            })
            .catch((error) => {
              console.error('Error generating PDF: ', error);
            });
        })
        .catch((error) => {
          console.error('Error generating header image: ', error);
        });
    } else {
      console.error("Element with id 'planilla' not found.");
    }
  }
}
