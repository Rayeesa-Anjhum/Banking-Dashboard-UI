// 1. Mock Database (10 Members)
const users = [
    { id: "NX-1001", name: "Arun Kumar", balance: 85200, card: "4420 8812 9901 4420", cvv: "123", type: "Gold", theme: "bg-indigo-gold", color: "#6366f1", transactions: [{desc: "Amazon Prime", amt: -999, date: "2024-02-11"}] },
    { id: "NX-1002", name: "Priya Dharshini", balance: 142000, card: "5512 0098 7721 8891", cvv: "456", type: "Platinum", theme: "bg-rose-pink", color: "#ec4899", transactions: [{desc: "Salary Credit", amt: 65000, date: "2024-02-01"}] },
    { id: "NX-1003", name: "Suresh Raina", balance: 5400, card: "1122 3344 5566 1122", cvv: "789", type: "Classic", theme: "bg-amber-dark", color: "#f59e0b", transactions: [{desc: "Fuel Station", amt: -1200, date: "2024-02-10"}] },
    { id: "NX-1004", name: "Meena Kumari", balance: 98000, card: "5566 7788 9900 1122", cvv: "321", type: "Gold", theme: "bg-emerald-green", color: "#10b981", transactions: [{desc: "Grocery Store", amt: -3400, date: "2024-02-08"}] },
    { id: "NX-1005", name: "Vikram Seth", balance: 21000, card: "9900 1122 3344 5566", cvv: "654", type: "Platinum", theme: "bg-cyan-blue", color: "#06b6d4", transactions: [{desc: "Netflix", amt: -499, date: "2024-02-07"}] },
    { id: "NX-1006", name: "Anitha Raj", balance: 12500, card: "3344 5566 7788 9900", cvv: "987", type: "Classic", theme: "bg-slate-pro", color: "#475569", transactions: [{desc: "ATM Withdrawal", amt: -5000, date: "2024-02-06"}] },
    { id: "NX-1007", name: "Karthik Raja", balance: 256700, card: "7788 9900 1122 3344", cvv: "147", type: "Gold", theme: "bg-indigo-gold", color: "#6366f1", transactions: [{desc: "Dividend", amt: 12000, date: "2024-02-05"}] },
    { id: "NX-1008", name: "Divya Bharathi", balance: 45000, card: "2233 4455 6677 8899", cvv: "258", type: "Platinum", theme: "bg-rose-pink", color: "#ec4899", transactions: [{desc: "Zomato", amt: -850, date: "2024-02-04"}] },
    { id: "NX-1009", name: "Rajesh Khanna", balance: 7200, card: "6677 8899 0011 2233", cvv: "369", type: "Classic", theme: "bg-amber-dark", color: "#f59e0b", transactions: [{desc: "Electric Bill", amt: -2200, date: "2024-02-03"}] },
    { id: "NX-1010", name: "Sneha Kapoor", balance: 33000, card: "4455 6677 8899 0011", cvv: "159", type: "Gold", theme: "bg-emerald-green", color: "#10b981", transactions: [{desc: "Freelance", amt: 15000, date: "2024-02-02"}] }
];

let currentUser = users[0];
let chartInstance = null;

// Initialization
function init() {
    const selector = document.getElementById('userSelector');
    users.forEach((u, i) => {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = u.name;
        selector.appendChild(opt);
    });
    updateUI();
}

function updateUI() {
    // Header & Info
    document.getElementById('user-name-display').innerText = currentUser.name;
    document.getElementById('user-id-display').innerText = `ID: ${currentUser.id}`;
    document.getElementById('balance').innerText = `₹${currentUser.balance.toLocaleString('en-IN')}`;
    
    // Card Update
    document.getElementById('card-number-display').innerText = currentUser.card;
    document.getElementById('card-holder-display').innerText = currentUser.name;
    document.getElementById('card-type').innerText = `NEXUS ${currentUser.type}`;
    document.getElementById('card-cvv').innerText = currentUser.cvv;
    document.getElementById('card-front-theme').className = `card-front absolute inset-0 p-8 rounded-[2.5rem] shadow-2xl text-white flex flex-col justify-between overflow-hidden ${currentUser.theme}`;

    // Avatar
    const avatar = document.getElementById('user-avatar');
    avatar.innerText = currentUser.name.split(' ').map(n => n[0]).join('');
    avatar.style.backgroundColor = currentUser.color;

    renderTransactions();
    renderChart();
}

function flipCard() {
    document.getElementById('credit-card').classList.toggle('flipped');
}

function switchUser() {
    const index = document.getElementById('userSelector').value;
    currentUser = users[index];
    document.getElementById('credit-card').classList.remove('flipped');
    updateUI();
}

function switchTab(tabId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function renderTransactions() {
    const list = document.getElementById('txn-list');
    list.innerHTML = currentUser.transactions.map(t => `
        <tr class="hover:bg-slate-50 transition-all">
            <td class="px-8 py-5">
                <p class="font-bold text-slate-800">${t.desc}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase">${t.date}</p>
            </td>
            <td class="px-8 py-5 text-right font-black ${t.amt > 0 ? 'text-emerald-500' : 'text-slate-900'}">
                ${t.amt > 0 ? '+' : '-'}₹${Math.abs(t.amt).toLocaleString('en-IN')}
            </td>
        </tr>
    `).join('');
}

function executeTransfer() {
    const amount = parseFloat(document.getElementById('target-amount').value);
    const name = document.getElementById('target-name').value;
    if (amount > currentUser.balance || isNaN(amount)) return alert("Invalid or Insufficient Balance!");
    
    currentUser.balance -= amount;
    currentUser.transactions.unshift({ desc: `Sent to ${name}`, amt: -amount, date: new Date().toISOString().split('T')[0] });
    alert("Transaction Successful!");
    updateUI();
    switchTab('dashboard');
}

function renderChart() {
    if (chartInstance) chartInstance.destroy();
    const ctx = document.getElementById('userChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                data: [currentUser.balance * 0.8, currentUser.balance * 0.9, currentUser.balance * 0.7, currentUser.balance * 0.85, currentUser.balance],
                borderColor: currentUser.color,
                borderWidth: 4, tension: 0.4, pointRadius: 0, fill: true,
                backgroundColor: `${currentUser.color}15`
            }]
        },
        options: { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
    });
}

document.addEventListener('DOMContentLoaded', init);