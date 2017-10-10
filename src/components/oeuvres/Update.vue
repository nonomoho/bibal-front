<template>
  <section class="section">
    <h1 class="title">Modifier l'oeuvre {{descriptionOeuvre}}</h1>
    <form @submit.prevent="submit">
      <div class="field">
        <div class="control">
          <label class="label">Titre</label>
          <input class="input" v-model="oeuvre.titre" required/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Auteur</label>
          <input class="input" v-model="oeuvre.auteur" required/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Année de sortie</label>
          <input class="input" v-model="oeuvre.anneeSortie" required/>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-primary" type="submit">Envoyer</button>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <router-link class="button is-outlined" :to="{name : 'oeuvres.index'}">Annuler</router-link>
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
      axios.get(`http://localhost:8083/oeuvres/${this.id}`)
        .then(resp => {
          this.oeuvre = resp.data
        })
    },
    data () {
      return {
        oeuvre: {}
      }
    },
    computed: {
      descriptionOeuvre () {
        return `${this.oeuvre.titre} de ${this.oeuvre.auteur}`
      }
    },
    methods: {
      submit () {
        axios.put(`http://localhost:8083/oeuvres/${this.id}`, this.oeuvre)
          .then(resp => {
            this.$router.push({name: 'oeuvres.index'}, () => {
              this.$toast.open({
                message: 'Modification effectuée',
                type: 'is-primary'
              })
            })
          })
          .catch(e => {
            this.$toast.open({
              message: 'Erreur',
              type: 'is-danger'
            })
          })
      }
    }
  }
</script>
