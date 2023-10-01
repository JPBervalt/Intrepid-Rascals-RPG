function callSearchItemsAPI() {
    const searchParameter = document.getElementById('item-search').value;
    const apiUrl = `https://api.open5e.com/v1/magicitems/?search=${searchParameter}`;
  
    fetch(apiUrl, {
      method: 'GET',
      headers: {
      },
    })
      .then(response => response.json())
      .then(data => {
        const items = data.results; // Obtenha a lista de itens da resposta
        const itemListHTML = document.querySelector('.item-list');
  
        // Limpe a lista existente
        itemListHTML.innerHTML = '';
  
        // Função para criar um card dinâmico para um item
        function createItemCard(item) {
          const itemCard = document.createElement('li');
          itemCard.classList.add('item-card');
  
          // Adicione informações ao cartão (Nome, Tipo, Descrição Curta, etc.)
          itemCard.innerHTML = `
            <b>Name:</b> ${item.name}<br>
            <b>Type:</b> ${item.type}<br>
            <span class="short-description">${item.desc.substring(0, 100)}...</span>
            <span class="full-description" style="display: none;">${item.desc}</span>
            <br>
            <button class="show-more-button">Mostrar Mais</button>
            <button class="show-less-button">Mostrar Menos</button>
           
          `;
  
          // Adicione um evento de clique para expandir/recolher o cartão
          const showMoreButton = itemCard.querySelector('.show-more-button');
          const showLessButton = itemCard.querySelector('.show-less-button');
          const fullDescription = itemCard.querySelector('.full-description');
  
          showMoreButton.addEventListener('click', () => {
            itemCard.classList.add('expanded');
            fullDescription.style.display = 'block';
            itemCard.style.maxHeight = '1000px';
            showMoreButton.style.display = 'none';
            showLessButton.style.display = 'inline-block';
          });
  
          showLessButton.addEventListener('click', () => {
            itemCard.classList.remove('expanded');
            fullDescription.style.display = 'none';
            itemCard.style.maxHeight = '400px';
            showMoreButton.style.display = 'inline-block';
            showLessButton.style.display = 'none';
          });
  
          return itemCard;
        }
  
        // Crie um card para cada item e adicione-o à lista
        items.forEach(item => {
          const itemCard = createItemCard(item);
          itemListHTML.appendChild(itemCard);
        });
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }