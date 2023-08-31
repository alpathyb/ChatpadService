/* eslint-disable */
const XLSX = require('xlsx');
import { isValidExcelFile } from './checkExcel';
import { showAlert } from './alert';
import { manageImport } from './manageImport';

const importForm = document.getElementById('import-form');
const importInput = document.getElementById('import-input');

if (importForm && importInput) {
  importForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);

      if (!isValidExcelFile(data)) {
        showAlert('error', 'That is not excel file');
        return;
      }

      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Ambil nama sheet pertama
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (!jsonData || jsonData.length === 0) {
        showAlert('error', 'There is no data in the file');
        return;
      }

      const dataImport = [];
      jsonData.forEach((el, index) => {
        if (index === 0) return;
        const sub = {};
        const questions = [];
        el.forEach((e, i) => {
          if (e) {
            if (i === 0) sub.name = e.trim();
            if (i === 1) sub.gender = e.toLowerCase().trim();
            if (i === 2) sub.age = e * 1;
            if (i === 3) sub.classification = e.trim();
            if (i === 4) sub.class = e * 1;
            if (i === 5) {
              const q = {};
              q.question = '64d76ac7fc1b290708cdbc87';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 6) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc91';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 7) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc92';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 8) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc93';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 9) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc94';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 10) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc95';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 11) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc96';
              q.answer = e.trim();
              questions.push(q);
            }
            if (i === 12) {
              const q = {};
              q.question = '64d76aebfc1b290708cdbc97';
              q.answer = e.trim();
              questions.push(q);
            }
          }
        });
        sub.questions = questions;
        if (Object.keys(sub).length > 0) dataImport.push(sub);
      });

      if (dataImport.length === 0) {
        showAlert('error', 'There is no data in the file');
        return;
      }

      console.log(dataImport.length);

      manageImport(dataImport);
    };

    if (importInput.files[0]) reader.readAsArrayBuffer(importInput.files[0]);
  });
}
