// app.js
document.getElementById('business-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // الحصول على القيم من النموذج
    const businessType = document.getElementById('business-type').value;
    const features = document.getElementById('features').value;

    // التحقق من الإدخال
    if (!businessType || !features) {
        alert('يرجى اختيار نوع الشركة والمميزات المطلوبة');
        return;
    }

    // بناء النتائج بناءً على الاختيارات
    const recommendations = getRecommendations(businessType, features);

    // عرض النتائج
    const resultsSection = document.getElementById('results');
    const resultsList = document.getElementById('results-list');
    const systemChoice = document.getElementById('system-choice');

    resultsList.innerHTML = '';
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        resultsList.appendChild(li);
    });

    systemChoice.textContent = `النظام المحاسبي المقترح: ${recommendations[0] || 'لا توجد نتائج'}`;
    resultsSection.classList.remove('hidden');
});

// إعادة تعيين النموذج
document.getElementById('reset-button').addEventListener('click', function () {
    document.getElementById('business-form').reset();
    document.getElementById('results').classList.add('hidden');
});

// دالة لإرجاع التوصيات بناءً على النوع والمميزات
function getRecommendations(businessType, features) {
    const systems = {
        small: {
            basic: ['QuickBooks', 'Xero'],
            advanced: ['Wave', 'FreshBooks'],
            erp: ['SAP Business One']
        },
        medium: {
            basic: ['Zoho Books', 'Kashoo'],
            advanced: ['Odoo', 'NetSuite'],
            erp: ['Microsoft Dynamics 365']
        },
        large: {
            basic: ['Tally', 'AccountEdge'],
            advanced: ['Sage 300', 'SAP Business ByDesign'],
            erp: ['Oracle ERP Cloud']
        },
        startup: {
            basic: ['Wave', 'QuickBooks Self-Employed'],
            advanced: ['FreshBooks', 'Zoho Books'],
            erp: ['Odoo']
        }
    };

    return systems[businessType][features] || ['لا توجد نتائج'];
}
