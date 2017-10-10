<template>
  <section class="section">
    <h1 class="title">Liste des exemplaires</h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link class="button is-primary" :to="{name: 'exemplaires.create'}">
            <b-icon icon="add"></b-icon>
            <span>Ajouter un exemplaire</span>
          </router-link>
        </div>
      </div>
    </div>

    <section class="mt10">
      <b-table :data="exemplaires">
        <template scope="props">
          <b-table-column field="etat" label="État" sortable>
            {{props.row.etat}}
          </b-table-column>
          <b-table-column field="oeuvre.titre" label="Titre de l'oeuvre" sortable>
            {{props.row.oeuvre.titre}}
          </b-table-column>
          <b-table-column width="80" label="Action">
            <router-link class="has-text-primary" :to="{name: 'exemplaires.update', params: {id: props.row.id}}">
              <b-icon class="is-clickable" icon="edit"></b-icon>
            </router-link>
            <b-icon @click.native="remove(props.row)" class="is-clickable" icon="delete" type="is-danger"></b-icon>
          </b-table-column>
        </template>
        <template slot="empty">
          <em>Aucune exemplaire</em>
        </template>
      </b-table>
    </section>

  </section>
</template>

<script>
  import axios from 'axios'
  import { without } from 'lodash'

  export default {
    created () {
      axios.get('http://localhost:8083/exemplaires')
        .then(resp => {
          this.exemplaires = resp.data._embedded.exemplaires
        })
        .catch(e => {
          this.$toast.open({
            message: 'Erreur',
            type: 'is-danger'
          })
        })
    },
    data () {
      return {
        exemplaires: []
      }
    },
    methods: {
      remove (exemplaire) {
        this.$dialog.confirm({
          title: 'Supprimer l\'exemplaire',
          message: `Êtes-vous sûr de vouloir supprimer l'exemplaire ${exemplaire.titre} de ${exemplaire.auteur} ?`,
          cancelText: 'Annuler',
          confirmText: 'Oui je le veux',
          type: 'is-danger',
          onConfirm: () => {
            axios.delete(`http://localhost:8083/exemplaires/${exemplaire.exemplaire_id}`)
              .then(resp => {
                this.exemplaires = without(this.exemplaires, exemplaire)
                this.$toast.open({
                  message: `${exemplaire.titre} de ${exemplaire.auteur} a bien été supprimé(e)`,
                  type: 'is-primary'
                })
              })
          }
        })
      }
    }
  }
</script>
