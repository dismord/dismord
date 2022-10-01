const logo = document.querySelector('div.logo');
const install = document.querySelector('div.install');
const npmbtn = document.querySelector('label[for=npm]');
const yarnbtn = document.querySelector('label[for=yarn]');
const pnpmbtn = document.querySelector('label[for=pnpm]');
const shellcmd = document.querySelector('.shell p.cmd');
const copybtn = document.querySelector('div.copy');
const tip = document.querySelector('div.tip');
const links = document.querySelector('div.links');

const sleep = (t) => new Promise(r => setTimeout(r, t));

window.onload = () => show();
npmbtn.onclick = () => change('npm');
yarnbtn.onclick = () => change('yarn');
pnpmbtn.onclick = () => change('pnpm');
copybtn.onclick = () => copy();

function show() {
    setTimeout(() => { logo.classList.remove('hide') }, 375);
    setTimeout(() => { install.classList.remove('hide') }, 625);
    setTimeout(() => { links.classList.remove('hide') }, 750);
};

function change(cmd) {
    shellcmd.innerHTML = cmd;
};

async function copy() {
    var content = shellcmd.innerHTML + ' create dismord';
    navigator.clipboard.writeText(content);
    tip.classList.remove('hide');
    await sleep(1000);
    tip.classList.add('hide');
};