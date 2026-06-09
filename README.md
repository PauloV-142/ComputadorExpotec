# ComputadorCSS

---

## Para a Expotec de 2025
### Projeto feito para demonstrar as habilidades de PHP que aprendemos na escola (aham)

Ainda não conheciamos o Git, então o processo de desenvolvimento foi leeento.

---

### Disclaimer:
Fiz uma maçaroca com os fetchs ao PHP dentro do código dos botões. Depois entendi que não era pra usar fetch mas sim SSR nativo do php.

Não olhe o código, não dá para entender nada 🫣

---

#### Se eu fosse refazer...
- Compactaria os fetchs num único módulo (`connection.js` por exemplo), criando uma função (interface) cujos parâmetros seriam o tipo de fetch (da tela, botão on/off, lixeira) e os dados.
  E acessaria como se fosse um objeto para maior clareza:
```js
conect.toggleComputerEnergy(true);
connect.changeWallpaper('https://examplewallpapers.com/cat.gif') // Yes, you can link gifs for some reason.
connect.createComputer('lenovo');
connect.deleteComputer();
```
