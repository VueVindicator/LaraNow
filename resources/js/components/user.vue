<template>
    <div class="container">
        <div class="row" v-if="$gate.isAdminOrAuthor()">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">User Table</h3>
  
                  <div class="card-tools">
                      <button class="btn btn-success" @click="addModal()" data-toggle="modal" data-target="#add-new">Add New <i class="fas fa-user-plus fa-fw"></i></button>
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
                        <th>Registered At</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users.data" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name | upText }}</td>
                        <td>{{ user.email }}</td>
                        <td><span class="tag tag-success">{{ user.type | upText }}</span></td>
                        <td>{{ user.created_at | myDate}}</td>
                        <td>
                            <a href="#" @click="editModal(user)">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a href="#" @click="deleteUser(user.id)">
                                <i class="fa fa-trash text-red"></i>
                            </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <pagination :data="users" @pagination-change-page="getResults"></pagination>
                </div>
              </div>
              <!-- /.card -->
            </div>
        </div>

        <div v-if="!$gate.isAdminOrAuthor()">
          <not-found/>
        </div>
    <!-- Modal -->
    <div class="modal fade" id="add-new" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-show="!editMode" class="modal-title" id="add-user">Add New User</h5>
              <h5 v-show="editMode" class="modal-title" id="add-user">Update User's Info</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="editMode ? updateUser() : createUser()">
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
                        'is-invalid': form.errors.has('type') }">
                        <option value="">Select User Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="author">Author</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" name="password" id="password" class="form-control" :class="{
                        'is-invalid': form.errors.has('password') }">
                      <has-error :form="form" field="password"></has-error>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeModal()">Close</button>
              <button v-show="editMode" @click="updateUser()" type="submit" class="btn btn-primary">Update</button>
              <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
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
                editMode: false,
                users: {},
                form: new Form({
                  id: '',
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
          getResults(page = 1){
            axios.get('api/user?page=' + page)
            .then(response => {
              this.users = response.data;
            });
          },
          updateUser(){
            this.$Progress.start();
            this.form.put("api/user/"+this.form.id)
            .then(() => {
              $('#add-new').modal('hide');
              Swal.fire(
                'Updated!',
                'Your Information has been Updated.',
                'success'
              )
              this.$Progress.finish();
              Fire.$emit('AfterCreate');
            })
            .catch(() => {
              this.$Progress.fail();
            });
          },
          editModal(user){
            this.editMode = true;
            this.form.reset();
            $('#add-new').modal('show');
            this.form.fill(user);
          },
          addModal(){
            this.editMode = false;
            this.form.reset();
            $('#add-new').modal('show');
          },
          closeModal(){
            this.form.errors.errors = [];
          },
          deleteUser(id){
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

            if(result.value){
            this.form.delete("api/user/"+id).then(() => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              Fire.$emit('AfterCreate');
            }).catch(() => {
              Swal.fire(
                'Failed!', 
                'You do not have authority to delete User', 
                'warning'
              );
            });
            }
            })
          },
          loadUsers(){
            if(this.$gate.isAdminOrAuthor()){
              axios.get("api/user").then(({ data }) => (this.users = data));
            }
          },
          createUser(){
            this.$Progress.start();
            this.form.post("api/user")
            .then(() => {
            this.$Progress.finish();
            Fire.$emit('AfterCreate');
            $('#add-new').modal('hide');

            Toast.fire({
              type: 'success',
              title: 'User Added Successfully'
            })

            })
            .catch((response) => {
              this.$Progress.fail();
              console.log(response);
            })   
          }
         },
        created() {
          Fire.$on('searching', () => {
            let query = this.$parent.search;
            this.$Progress.start();
            axios.get('api/finduser?q=' + query)
            .then((data) => {
              this.$Progress.finish();
              console.log(data);
              this.users = data.data;
            })
            .catch(() => {
              this.$Progress.fail();
              Toast.fire({
                type: 'error',
                title: 'Invalid Search query'
              })
            })
          })
            this.loadUsers();
            Fire.$on('AfterCreate', () => {
              this.loadUsers();
            })
            //setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
