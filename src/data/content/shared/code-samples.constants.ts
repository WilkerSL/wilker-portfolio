export const CODEBUILD_SPEC_SAMPLE = `//go:build ignore

package specs

type User struct {
	_         struct{}  \`gen:"table=users,softdelete"\`
	ID        uuid.UUID \`gen:"pk,auto"\`
	Name      string    \`gen:"required,notempty,max=120"\`
	Email     string    \`gen:"required,unique,email,max=254"\`
	Role      string    \`gen:"enum=admin|operator|viewer,default=viewer"\`
	OrgID     uuid.UUID \`gen:"rel=belongs_to:Org"\`
	CreatedAt time.Time \`gen:"auto=create"\`
}`;

export const CODEBUILD_COMMAND_SAMPLE = `codebuild build --starter --module example.com/shop --dialect postgres
go run ./cmd/migrate up
go run ./cmd/api`;
