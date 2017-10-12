<template>
  <section class="section">
    <h1 class="title">Liste des emprunts en cours</h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link class="button is-primary" :to="{name: 'emprunts.create'}">
            <b-icon icon="add"></b-icon>
            <span>Ajouter un emprunt</span>
          </router-link>
        </div>
      </div>
    </div>

    <section class="mt10">
      <b-table :data="emprunts">
        <template scope="props">
          <b-table-column field="usager.nom" label="Usager" sortable>
            {{props.row.usager.nom}} {{props.row.usager.prenom}}
          </b-table-column>
          <b-table-column field="dateEmprunt" label="Date début emprunt" sortable>
            {{props.row.dateEmprunt}}
          </b-table-column>
          <b-table-column field="oeuvre.titre" label="Oeuvre" sortable>
            {{props.row.oeuvre.titre}}
          </b-table-column>
          <b-table-column field="exemplaire.etat" label="État exemplaire" sortable>
            {{props.row.exemplaire.etat}}
          </b-table-column>
          <b-table-column width="80" label="Action">
            <router-link class="has-text-primary"
                         :to="{name: 'emprunts.update', params: {id: props.row.id}}">
              <b-icon class="is-clickable" icon="edit"></b-icon>
            </router-link>
          </b-table-column>
        </template>
        <template slot="empty">
          <em>Aucun emprunt</em>
        </template>
      </b-table>
    </section>

  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    created () {
      axios.get('http://localhost:8083/emprunts')
      .then(resp => {
        this.emprunts = resp.data._embedded.emprunts
      })
      .catch(e => {
        this.$toast.open({
          message: `Erreur : ${e.response.data}`,
          type: 'is-danger'
        })
      })
    },
    data () {
      return {
        emprunts: []
      }
    }
  }
</script>
