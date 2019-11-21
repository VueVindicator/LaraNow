<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">User Table</h3>
  
                  <div class="card-tools">
                      <button class="btn btn-success" data-toggle="modal" data-target="#add-new">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Modify</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td><span class="tag tag-success">Approved</span></td>
                        <td>
                            <a href="#">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a href="#">
                                <i class="fa fa-trash text-red"></i>
                            </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div>
    <!-- Modal -->
    <div class="modal fade" id="add-new" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add-new">Add New User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="createUser" @keydown="form.onKeydown($event)">
            <div class="modal-body">
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.name" type="text" name="name"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Name">
                    <has-error :form="form" field="name"></has-error>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="text" name="email"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" placeholder="Email">
                    <has-error :form="form" field="email"></has-error>
                </div>
                <div class="form-group">
                    <label>Bio</label>
                    <input v-model="form.bio" type="text" name="bio"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }" placeholder="Bio">
                    <has-error :form="form" field="bio"></has-error>
                </div>
                <div class="form-group">
                    <label>User Role</label>
                    <select name="type" v-model="form.type" id="type" class="form-control" :class="{
                        'is-valid': form.errors.has('type') }">
                        <option value="">Select User Role</option>
                        <option value="admin"></option>
                        <option value="user"></option>
                        <option value="author"></option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" name="password" id="password" class="form-control" :class="{
                        'is-valid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Create User</button>
            </div>
        </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
         data(){
             return{
                 form: new Form({
                     name: '',
                     email: '',
                     password: '',
                     type: '',
                     bio: '',
                     photo: ''
                 })
             }
         },
         methods: {
             createUser(){
                 // Submit the form via a POST request
                this.form.post('/login');
             }
         },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
