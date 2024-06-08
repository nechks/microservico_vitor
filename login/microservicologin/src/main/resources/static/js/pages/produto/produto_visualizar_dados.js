/**
 * @apiNote Função responsável por inserir os dados na tabela de visualização da listagem dos produtos
 * @param lista
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 16.04.2024
 */
function visualizarDados(lista) {
	let indice=0, html='';
    jQuery('#id_div_conteudo').html('');
    html += '<div class="row bg-info py-2 rounded-top-3">';
        html += '<div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 text-left text-uppercase fw-bold titulo-coluna-medio">Nome</div>';
        html += '<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left text-uppercase fw-bold titulo-coluna-medio">Preço</div>';
        html += '<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center text-uppercase fw-bold titulo-coluna-medio">Editar</div>';
    html += '</div>';
    html += '<div class="row">';
        html += '<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">';
            while(indice<lista.length) {
                if(indice%2==0)
                    cor='row-background-par';
                else
                    cor='row-background-impar';
                html += '<div class="row '+cor+'" id="id_row_'+indice+'">'
                    html += '<div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 text-left"><span class="align-middle titulo-coluna-medio text-uppercase">'+(lista[indice].nome ? lista[indice].nome : '')+'</span></div>';
                    html += '<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left"><span class="align-middle titulo-coluna-medio">'+(lista[indice].preco ? lista[indice].preco : '')+'</span></div>';
                    html += '<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">';
                        html += '<button type="button" class="btn objeto-ativo-inativo btn-editar p-0" id="editar-'+indice+'">';
                        html += '<i class="fa fa-pencil-square btn-icone-edit"></i>';
                        html += '</button>';
                    html += '</div>';
                html += '</div>';
                indice++;
            }
        html += '</div>';
    html += '</div>';
    jQuery('#id_div_conteudo').html(html);

    jQuery('.btn-editar').click(function() {
		let objeto = jQuery(this);
		let indice = objeto.attr('id');
        indice = indice.substring(7, indice.lengtht);
        window.sessionStorage.setItem('idProduto', lista[indice].id);
        document.location = '/novoProduto';
    });
}