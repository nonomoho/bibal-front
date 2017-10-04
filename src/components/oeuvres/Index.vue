<template>
  <section class="section">
    <h1 class="title">Liste des oeuvres</h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link class="button is-primary" :to="{name: 'oeuvres.create'}">
            <b-icon icon="add"></b-icon>
            <span>Ajouter un oeuvre</span>
          </router-link>
        </div>
      </div>
    </div>


    <section class="mt10">
      <b-table :data="oeuvres">
        <template scope="props">
          <b-table-column field="titre" label="Titre" sortable>
            {{props.row.titre}}
          </b-table-column>
          <b-table-column field="auteur" label="Auteur" sortable>
            {{props.row.auteur}}
          </b-table-column>
          <b-table-column field="anneeSortie" label="Année de sortie" sortable>
            {{props.row.anneeSortie}}
          </b-table-column>
          <b-table-column width="80" label="Action">
            <router-link class="has-text-black" :to="{name: 'oeuvres.update', params: {id: props.row.oeuvre_id}}">
              <b-icon class="is-clickable" icon="edit"></b-icon>
            </router-link>
            <b-icon @click.native="remove(props.row)" class="is-clickable" icon="delete" type="is-danger"></b-icon>
          </b-table-column>
        </template>
        <template slot="empty">
          <em>Aucune oeuvre</em>
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
      axios.get('http://localhost:8083/oeuvres')
        .then(resp => {
          this.oeuvres = resp.data
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
        oeuvres: []
      }
    },
    methods: {
      remove (oeuvre) {
        this.$dialog.confirm({
          title: 'Supprimer l\'oeuvre',
          message: `Êtes-vous sûr de vouloir supprimer l'oeuvre ${oeuvre.titre} de ${oeuvre.auteur} ?`,
          cancelText: 'Annuler',
          confirmText: 'Oui je le veux',
          type: 'is-danger',
          onConfirm: () => {
            axios.delete(`http://localhost:8083/oeuvres/${oeuvre.oeuvre_id}`)
              .then(resp => {
                this.oeuvres = without(this.oeuvres, oeuvre)
                this.$toast.open({
                  message: `${oeuvre.titre} de ${oeuvre.auteur} a bien été supprimé(e)`,
                  type: 'is-primary'
                })
              })
          }
        })
      }
    }
  }
</script>
