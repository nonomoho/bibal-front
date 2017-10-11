<template>
  <section class="section">
    <h1 class="title">Liste des usagers bibal</h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link class="button is-primary" :to="{name: 'usagers.create'}">
            <b-icon icon="add"></b-icon>
            <span>Ajouter un usager</span>
          </router-link>
        </div>
        <div class="level-item">
          <div class="field">
            <div class="control has-icons-left">
              <b-icon icon="search"></b-icon>
              <input type="search" class="input" v-model="search">
            </div>
          </div>
        </div>
      </div>
    </div>


    <section class="mt10">
      <b-table :data="filteredUsagers">
        <template scope="props">
          <b-table-column field="nom" label="Nom" sortable>
            {{props.row.nom}}
          </b-table-column>
          <b-table-column field="prenom" label="Prénom" sortable>
            {{props.row.prenom}}
          </b-table-column>
          <b-table-column field="adresse" label="Adresse" sortable>
            {{props.row.adresse}}
          </b-table-column>
          <b-table-column field="telephone" label="Téléphone" sortable>
            {{props.row.telephone}}
          </b-table-column>
          <b-table-column width="80" label="Action">
            <router-link class="has-text-primary"
                         :to="{name: 'usagers.update', params: {id: props.row.id}}">
              <b-icon class="is-clickable" icon="edit"></b-icon>
            </router-link>
            <b-icon @click.native="remove(props.row)" class="is-clickable" icon="delete"
                    type="is-danger"></b-icon>
          </b-table-column>
        </template>
        <template slot="empty">
          <em>Aucun usager</em>
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
      axios.get('http://localhost:8083/usagers')
      .then(resp => {
        this.usagers = resp.data._embedded.usagers
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
        usagers: [],
        search: ''
      }
    },
    computed: {
      filteredUsagers () {
        return this.usagers.filter(usager => {
          return usager.nom.toLowerCase().includes(this.search.toLocaleLowerCase())
        })
      }
    },
    methods: {
      remove (usager) {
        this.$dialog.confirm({
          title: 'Supprimer l\'usager',
          message: `Êtes-vous sûr de vouloir supprimer l'usager ${usager.nom} ${usager.prenom} ?`,
          cancelText: 'Annuler',
          confirmText: 'Oui je le veux',
          type: 'is-danger',
          onConfirm: () => {
            axios.delete(`http://localhost:8083/usagers/${usager.id}`)
            .then(resp => {
              this.usagers = without(this.usagers, usager)
              this.$toast.open({
                message: `${usager.nom} ${usager.prenom} a bien été supprimé(e)`,
                type: 'is-primary'
              })
            })
          }
        })
      }
    }
  }
</script>
