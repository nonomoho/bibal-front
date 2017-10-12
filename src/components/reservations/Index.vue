<template>
  <section class="section">
    <h1 class="title">Liste des réservations en cours</h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link class="button is-primary" :to="{name: 'reservations.create'}">
            <b-icon icon="add"></b-icon>
            <span>Ajouter un réservation</span>
          </router-link>
        </div>
      </div>
    </div>

    <section class="mt10">
      <b-table :data="reservEnCours">
        <template scope="props">
          <b-table-column field="usager.nom" label="Usager" sortable>
            {{props.row.usager.nom}} {{props.row.usager.prenom}}
          </b-table-column>
          <b-table-column field="dateEmprunt" label="Date début réservation" sortable>
            {{props.row.dateReservation}}
          </b-table-column>
          <b-table-column field="oeuvre.titre" label="Titre de l'oeuvre" sortable>
            {{props.row.oeuvre.titre}}
          </b-table-column>
          <b-table-column width="80" label="Action">
            <router-link class="has-text-primary"
                         :to="{name: 'reservations.update', params: {id: props.row.id}}">
              <b-icon class="is-clickable" icon="edit"></b-icon>
            </router-link>
            <b-icon @click.native="remove(props.row)" class="is-clickable" icon="delete"
                    type="is-danger"></b-icon>
          </b-table-column>
        </template>
        <template slot="empty">
          <em>Aucune reservation</em>
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
      axios.get('http://localhost:8083/reservations')
      .then(resp => {
        this.reservations = resp.data._embedded.reservations
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
        reservations: []
      }
    },
    computed: {
      reservEnCours () {
        return this.reservations.filter(reserv => {
          return reserv.etat === 'EN_COURS'
        })
      }
    },
    methods: {
      remove (reservation) {
        this.$dialog.confirm({
          title: 'Supprimer l\'reservation',
          message: `Êtes-vous sûr de vouloir supprimer l'reservation ${reservation.titre} de ${reservation.auteur} ?`,
          cancelText: 'Annuler',
          confirmText: 'Oui je le veux',
          type: 'is-danger',
          onConfirm: () => {
            axios.delete(`http://localhost:8083/reservations/${reservation.id}`)
            .then(resp => {
              this.reservations = without(this.reservations, reservation)
              this.$toast.open({
                message: `Exemplaire supprimé`,
                type: 'is-primary'
              })
            })
          }
        })
      }
    }
  }
</script>
