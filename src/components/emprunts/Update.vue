<template>
  <section class="section">
    <h1 class="title">Ajouter un emprunt</h1>
    <form @submit.prevent="submit">
      <div class="field">
        <div class="control">
          <label class="label">Date emprunt</label>
          <date-picker v-model="emprunt.dateEmprunt"></date-picker>
        </div>
      </div>
      <div class="field is-expanded">
        <label class="label">Oeuvre</label>
        <div class="select is-fullwidth">
          <select v-model="emprunt.oeuvreId">
            <option v-for="oeuvre in oeuvres" :value="oeuvre.id">{{ oeuvre.titre }}</option>
          </select>
        </div>
      </div>
      <div class="field is-expanded">
        <label class="label">Usager</label>
        <div class="select is-fullwidth">
          <select v-model="emprunt.usagerId">
            <option v-for="usager in usagers" :value="usager.id">{{ usager.nom }} {{ usager.prenom
              }}
            </option>
          </select>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-primary" type="submit">Envoyer</button>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <router-link class="button is-outlined" :to="{name : 'emprunts.index'}">Annuler
          </router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['id'],
    created () {
      axios.get(`http://localhost:8083/emprunts/${this.id}`)
      .then(resp => {
        const emprunt = resp.data
        const embed = resp.data._embedded
        this.emprunt = {
          id: emprunt.id,
          dateEmprunt: emprunt.dateEmprunt,
          oeuvreId: embed.exemplaire.oeuvre.id,
          usagerId: embed.usager.id
        }
      })

      axios.get('http://localhost:8083/oeuvres')
      .then(resp => {
        this.oeuvres = resp.data._embedded.oeuvres
      })
      .catch(e => {
        this.$toast.open({
          message: 'Erreur',
          type: 'is-danger'
        })
      })

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
        emprunt: {
          oeuvreId: ''
        },
        etats: [
          {id: 'BON', name: 'Bon'},
          {id: 'ABIME', name: 'Abimé'},
          {id: 'INUTILISABLE', name: 'Inutilisable'}
        ],
        oeuvres: [],
        usagers: []
      }
    },
    methods: {
      submit () {
        axios.put(`http://localhost:8083/emprunts/${this.emprunt.id}`, this.emprunt)
        .then(resp => {
          this.$router.push({name: 'emprunts.index'}, () => {
            this.$toast.open({
              message: 'Emprunt enregistré',
              type: 'is-primary'
            })
          })
        })
        .catch(e => {
          this.$toast.open({
            message: `Erreur : ${e.response.data}`,
            type: 'is-danger'
          })
        })
      }
    }
  }
</script>
